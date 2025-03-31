import authController from './auth.controller.js';

async function authRoutes(fastify) {
  fastify.post('/login', authController.login);
}

export default authRoutes;
