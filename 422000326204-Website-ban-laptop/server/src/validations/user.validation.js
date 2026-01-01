import Joi from 'joi'

export const updateUserSchema = Joi.object({
  role: Joi.string().valid('admin', 'staff', 'user').required(),
  isActive: Joi.boolean().required()
})
