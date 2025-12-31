import Joi from 'joi'

export const createOrderSchema = Joi.object({
  phone: Joi.string().min(8).max(15).required(),
  shippingAddress: Joi.string().min(5).max(255).required(),
  items: Joi.array().items(
    Joi.object({
      productId: Joi.number().integer().positive().required(),
      qty: Joi.number().integer().min(1).required()
    })
  ).min(1).required()
})
