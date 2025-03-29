# Greeting App

This is a simple Node.js application that provides a greeting page where users can enter their name and date of birth. Upon clicking the greeting button, the application calculates the user's age and displays a personalized greeting message.

## Project Structure

```
greeting-app
├── src
│   ├── public
│   │   ├── css
│   │   │   └── style.css
│   │   ├── js
│   │   │   └── main.js
│   │   └── index.html
│   ├── server.js
│   └── routes
│       └── index.js
├── tests
│   └── unit
│       └── greeting.test.js
├── package.json
├── Dockerfile
├── .dockerignore
├── jest.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd greeting-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the server, run the following command:
```
node src/server.js
```

The application will be available at `http://localhost:3000`.

### Using the Application

1. Open your web browser and navigate to `http://localhost:3000`.
2. Enter your name and date of birth in the provided fields.
3. Click the "Greet Me" button to see your personalized greeting.

### Running Tests

The application uses Jest for testing. To run the tests, use the following command:

```
npm test
```

For running tests with coverage report:

```
npm run test:coverage
```

### Docker

To build and run the application using Docker, follow these steps:

1. Build the Docker image:
   ```
   docker build -t greeting-app .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 greeting-app
   ```

The application will be accessible at `http://localhost:3000` in your web browser.

## License

This project is licensed under the MIT License.