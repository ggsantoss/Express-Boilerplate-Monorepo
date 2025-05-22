// import express, { Express } from 'express';
// import request from 'supertest';
// import { UserController } from '../../controller/UserController';
// import { UserRepository } from '../../repository/UserRepository';
// import { BcryptUtils } from '../../utils/bcrypt';

// jest.mock('../../repository/UserRepository');
// jest.mock('../../utils/bcrypt');

// let app: Express;

// const userController = new UserController();
// const userRepository = new UserRepository();

// beforeAll(async () => {
//   app = express();
//   app.use(express.json());
//   app.post('/auth/register', userController.register.bind(userController));
// });

// describe('POST /auth/register - Register User', () => {
//   it('should return 400 if the email is invalid', async () => {
//     const response = await request(app).post('/auth/register').send({
//       name: 'usertest123',
//       email: '1',
//       password: 'strongPassword123',
//     });

//     expect(response.status).toBe(400);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toMatch(/email.*valid/i);
//   });

//   it('should return 400 if the password is too short', async () => {
//     const response = await request(app).post('/auth/register').send({
//       name: 'usertest123',
//       email: 'userteste@email.com',
//       password: 'fragile',
//     });

//     expect(response.status).toBe(400);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toMatch(/password.*length/i);
//   });

//   it('should return 400 if the name is too shrot', async () => {
//     const response = await request(app).post('/auth/register').send({
//       name: 'a',
//       email: 'userteste@email.com',
//       password: 'strongPassword123',
//     });

//     expect(response.status).toBe(400);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toMatch(/name.*length/i);
//   });

//   it('should return 400 if the email is already in use', async () => {
//     (userRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 1 });

//     const response = await request(app).post('/auth/register').send({
//       name: 'usertest123',
//       email: 'userteste@email.com',
//       password: 'strongPassword123',
//     });

//     expect(response.status).toBe(400);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toMatch(/email.*exists/i);
//   });

//   it('should return 201 and create a new user if registration is successful', async () => {
//     (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
//     (BcryptUtils.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
//     (userRepository.create as jest.Mock).mockResolvedValue({
//       id: 1,
//       name: 'usertest123',
//       email: 'userteste@email.com',
//       password: 'hashedPassword',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });

//     const response = await request(app).post('/auth/register').send({
//       name: 'usertest123',
//       email: 'userteste@email.com',
//       password: 'strongPassword123',
//     });

//     expect(response.status).toBe(201);
//     expect(response.body.success).toBe(true);
//     expect(response.body.data).toMatchObject({
//       id: 1,
//       name: 'usertest123',
//       email: 'userteste@email.com',
//     });
//   });
// });
