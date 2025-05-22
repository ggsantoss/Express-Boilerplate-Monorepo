// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const userAuthDocs = YAML.load('./src/docs/userAuthDocs.yaml');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API Express Boilerplate',
      version: '1.0.0',
      description: 'Documentação Boilerplate',
    },
    paths: {
      ...userAuthDocs.paths,
    },
    components: {
      schemas: {
        ...userAuthDocs.components.schemas,
      },
    },
  },
  apis: ['src/router/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
