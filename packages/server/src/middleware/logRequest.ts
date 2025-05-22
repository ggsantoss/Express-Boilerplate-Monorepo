import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.info({
      req: {
        method: req.method,
        url: req.url,
        headers: req.headers,
      },
      res: {
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      },
    });
  });

  next();
};

export default logRequest;
