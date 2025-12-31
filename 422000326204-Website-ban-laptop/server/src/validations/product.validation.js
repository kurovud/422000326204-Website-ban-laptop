import Joi from 'joi'

export const upsertProductSchema = Joi.object({
  sku: Joi.string().min(2).max(50).required(),
  name: Joi.string().min(3).max(200).required(),
  type: Joi.string().valid('laptop', 'pc', 'component').required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  description: Joi.string().allow('', null),
})
