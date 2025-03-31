import usersDao from './dao/users.dao.js';

const getUsers = async () => {
  console.log(await usersDao.getAllUsers());

  return usersDao.getAllUsers();
};

const getUserById = async id => {
  return usersDao.getUserById(id);
};

const createUser = async data => {
  return usersDao.createUser(data);
};

const updateUser = async (id, data) => {
  return usersDao.updateUser(id, data);
};

const deleteUser = async id => {
  return usersDao.deleteUser(id);
};

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
