import bcrypt from 'bcrypt';
import User from '../entity/user.entity.js';

const getAllUsers = async () => {
  return await User.findAll({
    attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
  });
};

const getUserById = async id => {
  return await User.findByPk(id, {
    attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
  });
};

const createUser = async data => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await User.create({ ...data, password: hashedPassword });
};

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  await user.update(data);
  return user;
};

const deleteUser = async id => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return user;
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
