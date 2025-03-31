import authRoutes from '../../../modules/auth/auth.routes.js';
import saleRoutes from '../../../modules/sale/sale.routes.js';
import userRoutes from '../../../modules/users/users.routes.js';

async function allRoutes(fastify) {
  fastify.register(userRoutes);
  fastify.register(authRoutes);
  fastify.register(saleRoutes);
}

export default allRoutes;
