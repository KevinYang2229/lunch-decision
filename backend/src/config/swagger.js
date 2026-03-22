import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lunch Decision API',
      version: '1.0.0',
      description: 'API for the Lunch Decision Application',
    },
    servers: [
      {
        url: 'http://localhost:5002',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
