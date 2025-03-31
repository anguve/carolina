import Fastify from 'fastify';
import allRoutes from './common/shared/routes/all.routes.js';
import sequelize from './plugins/db.js';
import './common/models/index.js';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: false });
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
});
fastify.register(allRoutes, { prefix: '/api' });

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
