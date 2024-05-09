import Joi, { ObjectSchema } from "joi";

const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  contrasena: Joi.string().required(),
});

export default {
  "validate/login": loginSchema,
} as { [key: string]: ObjectSchema };
