import User from '../../users/entity/user.entity.js';

const findByEmail = async email => {
  return User.findOne({ where: { email } });
};

export default { findByEmail };
