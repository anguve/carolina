export const successResponse = (reply, status, message, data = {}) => {
  return reply.status(status).send({
    success: true,
    message,
    data
  });
};
