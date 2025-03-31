import saleDao from './dao/sale.dao.js';

const createSale = async data => await saleDao.createSale(data);
const getSales = async () => await saleDao.getAllSales();
const getSale = async id => await saleDao.getSaleById(id);
const updateSale = async (id, data) => await saleDao.updateSale(id, data);
const deleteSale = async id => await saleDao.deleteSale(id);

export default { createSale, getSales, getSale, updateSale, deleteSale };
