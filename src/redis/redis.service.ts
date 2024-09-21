import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit {
  client: Redis;

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      const redisHost = this.configService.get<string>('REDIS_HOST');
      const redisPort = this.configService.get<number>('REDIS_PORT');
      const redisPassword = this.configService.get<string>('REDIS_PASSWORD');

      this.client = new Redis({
        host: redisHost,
        port: redisPort,
        password: redisPassword,
      });

      // Error event handler
      this.client.on('error', (err: Error) => {
        console.error('Redis error:', err);
      });
      await this.client.ping();
    } catch (err) {
      throw err;
    }
  }

  async set<T>(key: string, value: T, expiresAt?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      if (expiresAt) {
        await this.client.set(key, serializedValue, 'EX', expiresAt);
      } else {
        await this.client.set(key, serializedValue);
      }
    } catch (err) {
      throw err;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      throw err;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      throw err;
    }
  }

  async setOtp(
    otpUniqueId: string,
    userId: string,
    otpValue: string,
    expiresAt?: number,
  ): Promise<void> {
    try {
      const value = JSON.stringify({ otp: otpValue, userId, expiresAt });
      if (expiresAt) {
        await this.client.set(otpUniqueId, value, 'EX', expiresAt);
      } else {
        await this.client.set(otpUniqueId, value);
      }
    } catch (err) {
      throw err;
    }
  }

  async enqueueJob(job): Promise<void> {
    const serializedJob = JSON.stringify(job);
    await this.client.rpush('crawlQueue', serializedJob);
  }

  async dequeueJob() {
    const job = await this.client.brpop('crawlQueue', 0);
    if (!job) return null;
    return JSON.parse(job[1]);
  }

  async flushAll(): Promise<void> {
    try {
      await this.client.flushall(); // Flush all keys from the Redis store
    } catch (err) {
      throw err;
    }
  }

  async deleteKeysByPattern(pattern: string): Promise<void> {
    try {
      // Use scanStream to efficiently iterate over keys matching the pattern
      const stream = this.client.scanStream({
        match: pattern,
      });

      // Process each batch of keys
      for await (const keysBatch of stream) {
        if (keysBatch.length > 0) {
          const pipeline = this.client.pipeline(); // Use a pipeline to batch delete commands for efficiency
          keysBatch.forEach((key) => {
            pipeline.del(key);
          });
          await pipeline.exec();
        }
      }
    } catch (err) {
      throw err;
    }
  }
}
