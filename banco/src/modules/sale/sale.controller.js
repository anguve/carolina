import { successResponse } from '../../common/utils/response.util.js';
import { saleSchema } from './request/sale.schema.js';
import saleService from './sale.service.js';

const getSales = async (req, reply) => {
  return successResponse(reply, 200, 'Lista de ventas obtenida con éxito.', {
    response: await saleService.getSales()
  });
};

const getSale = async (req, reply) => {
  return successResponse(reply, 200, 'Venta obtenida con éxito.', {
    response: await saleService.getSale(req.params.id)
  });
};

const createSale = async (req, reply) => {
  // await saleSchema.validate(req.body, { abortEarly: false });
  return successResponse(reply, 201, 'Venta creada correctamente.', {
    response: await saleService.createSale(req.body)
  });
};

const updateSale = async (req, reply) => {
  return successResponse(reply, 200, 'Venta actualizada correctamente.', {
    response: await saleService.updateSale(req.params.id, req.body)
  });
};

const deleteSale = async (req, reply) => {
  return successResponse(reply, 200, 'Venta eliminada correctamente.', {
    id: await saleService.deleteSale(req.params.id)
  });
};

export default { getSales, getSale, createSale, updateSale, deleteSale };
