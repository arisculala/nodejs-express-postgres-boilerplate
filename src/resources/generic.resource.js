import Joi from 'joi';

export const idSchema = Joi.object({
  id: Joi.string().required()
});

export const authHeaderSchema = Joi.object({
  authorization: Joi.string().required()
});
