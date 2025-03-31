import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default';

const getTokenFromHeader = request => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('No autorizado. Token requerido');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    throw new Error('Formato de token inválido');
  }

  return parts[1];
};

const verifyToken = token => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

export const authenticate = async (request, reply) => {
  try {
    const token = getTokenFromHeader(request);
    request.user = verifyToken(token);
  } catch (error) {
    return reply.status(401).send({ message: error.message });
  }
};
