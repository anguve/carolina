import { successResponse } from '../../common/utils/response.util.js';
import { userSchema } from './request/user.schema.js';
import usersService from './users.service.js';

const getUsers = async (request, reply) => {
  const users = await usersService.getUsers();
  return successResponse(reply, 200, 'Usuario logeado correctamente.', {
    users
  });
};

const getUserById = async (request, reply) => {
  const { id } = request.params;
  const user = await usersService.getUserById(id);
  if (!user) return reply.status(404).send({ error: 'Usuario no encontrado' });

  return successResponse(reply, 200, 'Usuario logeado correctamente.', {
    user
  });
};

const createUser = async (request, reply) => {
  await userSchema.validate(request.body, { abortEarly: false });
  await usersService.createUser(request.body);
  return successResponse(reply, 200, 'Usuario creado correctamente.');
};

const updateUser = async (request, reply) => {
  const { id } = request.params;
  const user = await usersService.updateUser(id, request.body);
  if (!user) return reply.status(404).send({ error: 'Usuario no encontrado' });
  return successResponse(reply, 200, 'Usuario actualizado correctamente.', {
    user
  });
};

const deleteUser = async (request, reply) => {
  const { id } = request.params;
  const user = await usersService.deleteUser(id);
  if (!user) return reply.status(404).send({ error: 'Usuario no encontrado' });
  return successResponse(reply, 200, 'Usuario eliminado correctamente', {
    user
  });
};

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
