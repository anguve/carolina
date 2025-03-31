import { genToken } from '../../common/utils/jwt/jwt.js';
import authDao from './dao/auth.dao.js';
import bcrypt from 'bcrypt';

const getUserByEmail = async email => {
  const user = await authDao.findByEmail(email);
  if (!user) {
    throw new Error('Usuario no encontrado.');
  }
  return user;
};

const checkPassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  if (!isValid) {
    throw new Error('Contraseña o usuario inválidos.');
  }
};

const login = async request => {
  const { email, password } = request.body;
  const user = await getUserByEmail(email);
  await checkPassword(password, user.password);
  return {
    email: user.email,
    role: user.role,
    access_token: genToken({ email: user.email, id: user.id })
  };
};

export default { login };
