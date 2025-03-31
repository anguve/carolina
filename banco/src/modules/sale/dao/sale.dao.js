import User from '../../users/entity/user.entity.js';
import Sale from '../entity/sale.entity.js';

const getAllSales = async () => {
  return await Sale.findAll({
    include: [
      { model: User, as: 'creator', attributes: ['email'] },
      { model: User, as: 'editor', attributes: ['email'] }
    ]
  });
};

const getSaleById = async id => {
  return await Sale.findByPk(id, {
    include: [
      { model: User, as: 'creator', attributes: ['email'] },
      { model: User, as: 'editor', attributes: ['email'] }
    ]
  });
};
const createSale = async data => await Sale.create(data);
const updateSale = async (id, data) =>
  await Sale.update(data, { where: { id } });
const deleteSale = async id => await Sale.destroy({ where: { id } });

export default { getAllSales, getSaleById, createSale, updateSale, deleteSale };
