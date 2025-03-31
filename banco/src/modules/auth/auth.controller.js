import { successResponse } from '../../common/utils/response.util.js';
import authService from './auth.service.js';
import { loginSchema } from './request/login.schema.js';

const login = async (request, reply) => {
  try {
    await loginSchema.validate(request.body, { abortEarly: false });
    const auth = await authService.login(request);
    return successResponse(reply, 200, 'Usuario logeado correctamente.', {
      email: auth.email,
      role: auth.role,
      access_token: auth.access_token
    });
  } catch (error) {
    return reply.status(400).send({ message: error.message });
  }
};

export default { login };
