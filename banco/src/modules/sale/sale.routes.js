import { authenticate } from '../../common/middleware/auth.middleware.js';
import saleController from './sale.controller.js';

async function saleRoutes(fastify) {
  fastify.post(
    '/getSales',
    { preHandler: [authenticate] },
    saleController.getSales
  );
  fastify.post(
    '/getSale/:id',
    { preHandler: [authenticate] },
    saleController.getSale
  );
  fastify.post(
    '/addSales',
    { preHandler: [authenticate] },
    saleController.createSale
  );
  fastify.post(
    '/editSales/:id',
    { preHandler: [authenticate] },
    saleController.updateSale
  );
  fastify.post(
    '/deleteSales/:id',
    { preHandler: [authenticate] },
    saleController.deleteSale
  );
}

export default saleRoutes;
