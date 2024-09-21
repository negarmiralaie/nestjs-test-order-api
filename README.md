# Simple Order Project
## This is a simple order management project implemented using NestJS, TypeScript, PostgreSQL, and TypeORM. The application leverages Redis for caching, handles pagination, and uses Swagger for API documentation, which is accessible at /api.

### Table of Contents
* <a href="http://nestjs.com/" target="blank">Overview</a>
* <a href="http://nestjs.com/" target="blank">Technologies Used</a>
* <a href="http://nestjs.com/" target="blank">Features</a>
* <a href="http://nestjs.com/" target="blank">Installation</a>
* <a href="http://nestjs.com/" target="blank">Environment Variables</a>
* <a href="http://nestjs.com/" target="blank">Running the Application</a>
* <a href="http://nestjs.com/" target="blank">API Documentation</a>
* <a href="http://nestjs.com/" target="blank">Available Routes</a>
* <a href="http://nestjs.com/" target="blank">Caching and Pagination</a>

#### Overview
The Simple Order Project is a straightforward application designed to manage users, products, and orders. It leverages modern technologies to ensure scalability, performance, and ease of use. Redis is integrated for caching frequently accessed data, and Swagger provides interactive API documentation accessible at /api.

#### Technologies Used
* NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
* TypeScript: A strongly typed programming language that builds on JavaScript.
* PostgreSQL: A powerful, open-source object-relational database system.
* TypeORM: An ORM that can run in Node.js, browsers, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript.
* Redis: An open-source, in-memory data structure store, used as a database, cache, and message broker.
* Swagger: A tool for designing, building, documenting, and consuming RESTful web services.

#### Features
* User Management: Create and manage user accounts.
* Product Management: Add and manage products.
* Order Management: Place orders linking users and products.
* Pagination: Retrieve orders in paginated form for better performance.
* Caching with Redis: Cache order data to accelerate data retrieval.
* API Documentation with Swagger: Interactive API docs available at /api.

#### Installation
Follow the steps below to set up and run the project locally.

1. Clone the Repository
```bash
git clone https://github.com/yourusername/simple-order-project.git
cd simple-order-project
```

2. Install Dependencies
Ensure you have Node.js and npm installed.

```bash
Ensure you have Node.js and npm installed.
```

3. Set Up the Database
```bash
createdb simple_order_db
```

4. Set Up Redis
```bash
docker run --name redis -p 6379:6379 -d redis
```

#### Environment Variables
Create a .env file in the root directory based on the provided .env.example. This file holds all necessary environment configurations.

```bash
cp .env.example .env
```
.env.example:
```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=simple_order_db

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Swagger Configuration
SWAGGER_TITLE=Simple Order Project API
SWAGGER_DESCRIPTION=API documentation for the Simple Order Project
SWAGGER_VERSION=1.0
```

#### Running the Application
Development Mode: To run the application in development mode with hot-reloading:

```bash
npm run start:dev
```
Production Mode: To build and run the application in production mode:
```bash
npm run build
npm run start:prod
```
The server will start on the port specified in the .env file (default is 3000).

#### API Documentation
Swagger UI is integrated for interactive API documentation.
* Access the API Docs: http://localhost:3000/api
Here, you can explore and test the available API endpoints.

#### Available Routes
1. Create a User
* Endpoint: POST /users
Description: Creates a new user.
Request Body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
}
```

2. Create a Product
* Endpoint: POST /products
Description: Creates a new product.
Request Body:


```json
{
  "name": "Lenovo Laptop3",
  "price": 10
}
```

3. Create an Order
* Endpoint: POST /orders
Description: Creates a new order linking a user and a product.
Request Body:


```json
{
  "ordererId": "user-uuid",
  "productId": "product-uuid",
  "amount": 10,
  "discount": 10
}
```

4. Get User Orders with Pagination
* Endpoint: GET /orders/user/:id
Description: Retrieves a paginated list of orders for a specific user.
Parameters:
* id (path parameter): The ID of the user.
* page (query parameter, optional): The page number (default is 1).
* limit (query parameter, optional): The number of orders per page (default is 10).
Example Request:

```bash
GET /orders/user/9ea45937-8c27-497a-b486-a658ac26a4c6?page=1&limit=5
```

#### Caching and Pagination
##### Caching with Redis
To enhance the performance and speed of data retrieval, especially for frequently accessed data like user orders, Redis is utilized as a caching layer.

* Caching Strategy:
When Fetching Orders: Before querying the database, the service checks if the paginated orders for the user exist in Redis.
Cache Hit: If the data is present in Redis, it retrieves the data from the cache, significantly reducing response time.
Cache Miss: If the data is not in Redis, it fetches from PostgreSQL, stores the result in Redis for future requests, and then returns the data to the client.
* Cache Invalidation:
When a new order is created or an existing order is updated/deleted, the corresponding cached data in Redis is invalidated or updated to ensure data consistency.

##### Pagination
* Pagination is implemented to handle large datasets efficiently by dividing them into manageable chunks.
Parameters:
* page: Specifies the current page number.
limit: Determines the number of items per page.

Benefits:
* Performance Optimization: Reduces the amount of data processed and transmitted in each request.
* Improved User Experience: Allows users to navigate through data seamlessly without overwhelming them with too much information at once.

Implementation Details:
* Database Query: Utilizes TypeORM's findAndCount method with skip and take options to fetch the appropriate subset of orders.
* Response Structure: Includes pagination metadata such as total, page, limit, and totalPages to inform clients about the dataset.





