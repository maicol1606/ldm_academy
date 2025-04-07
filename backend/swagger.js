import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endPointsFiles = ['./index.js'];
const doc = {
  info: {
    title: 'API de la aplicación',
    description: 'Documentación de la API de la aplicación',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};
swaggerAutogen()(outputFile, endPointsFiles, doc);