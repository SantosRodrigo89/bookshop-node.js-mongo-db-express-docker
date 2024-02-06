# Express MongoDB

## Description

This is a simple Node.js application using Express.js and MongoDB. It provides a starting point for building applications that require RESTful APIs with MongoDB as the database backend.

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd express-mongodb
   ```

3. Install dependencies:

   ```
   npm install
   ```

## Usage

To run the application in development mode, use the following command:

```
npm run dev
```

This will start the server using Nodemon, which will automatically restart the server whenever changes are detected in the code.

## Testing

To execute tests, run:

```
npm test
```

## Docker

To containerize the application using Docker, you can build the Docker image using the provided Dockerfile:

```
docker build -t express-mongodb .
```

Then, you can run the container using:

```
docker run -p <host-port>:<container-port> express-mongodb
```

Replace `<host-port>` with the port on your host machine where you want to expose the application, and `<container-port>` with the port on which the application is running inside the container.

## Linting

To lint the code using ESLint, run:

```
npm run lint
```

## Dependencies

- dotenv: ^16.3.1
- express: ^4.18.2
- mongodb: ^6.0.13
- mongoose: ^8.0.4
- nodemon: ^3.0.2

## Dev Dependencies

- eslint: ^8.56.0

## License

This project is licensed under the ISC License.
