import Joi from "joi";

export const registerSchema = Joi.object({
	name: Joi.string().min(2).max(100).required(),
	password: Joi.string().min(8).required(),
	email: Joi.string().email().required(),
	age: Joi.number().integer().min(13).max(120),
});
export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});
