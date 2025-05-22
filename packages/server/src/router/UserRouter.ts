import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from '../controller/UserController';

const userAuthRouter = Router();

const userController = new UserController();

userAuthRouter.post('/register', async (req, res, next) => {
  userController.register(req, res).catch(next);
});

userAuthRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    userController.login(req, res).catch(next);
  },
);

userAuthRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    userController.findById(req, res).catch(next);
  },
);

userAuthRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    userController.findAll(req, res).catch(next);
  },
);

userAuthRouter.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    userController.delete(req, res).catch(next);
  },
);

userAuthRouter.put(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    userController.update(req, res).catch(next);
  },
);

userAuthRouter.patch(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    userController.updatePartial(req, res).catch(next);
  },
);

export default userAuthRouter;
