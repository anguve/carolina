import { authenticate } from '../../common/middleware/auth.middleware.js';
import usersController from './users.controller.js';

async function userRoutes(fastify) {
  fastify.post(
    '/getUsers',
    { preHandler: [authenticate] },
    usersController.getUsers
  );
  fastify.post(
    '/getUser/:id',
    { preHandler: [authenticate] },
    usersController.getUserById
  );
  fastify.post(
    '/addUsers',
    { preHandler: [authenticate] },
    usersController.createUser
  );
  fastify.post(
    '/editUsers/:id',
    { preHandler: [authenticate] },
    usersController.updateUser
  );
  fastify.post(
    '/deleteUsers/:id',
    { preHandler: [authenticate] },
    usersController.deleteUser
  );
}

export default userRoutes;
