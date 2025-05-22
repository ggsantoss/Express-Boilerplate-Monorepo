import express from 'express';
import http from 'http';
import userAuthRouter from './router/UserRouter';
import { ErrorHandler } from './middleware/errorHandler';
import logRequest from './middleware/logRequest';
import { swaggerSpec, swaggerUi } from './utils/swagger';

class Server {
  public start(): http.Server {
    const app = express();

    app.use(logRequest);

    app.use(express.json());

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use('/auth', userAuthRouter);

    app.use(ErrorHandler.handler);

    return app.listen(3000, () => {
      // eslint-disable-next-line no-console
      console.log('Servidor iniciado em http://localhost:3000');
    });
  }
}

export default new Server();
