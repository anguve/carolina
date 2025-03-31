import jwt from 'jsonwebtoken';

import 'dotenv/config';

const secretKey = process.env.JWT_SECRET || 'default';

export const genToken = payload =>
  jwt.sign(payload, secretKey, { expiresIn: '15m' });
