const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    "string.empty": "name yuborilishi shart",
    "any.required": "name yuborilishi shart",
  }),
  email: Joi.string().min(5).email().required().messages({
    "string.empty": "email yuborilishi shart",
    "string.min": "email 5 ta belgidan kam bo'lmasligi kerak",
    "string.email": "To'g'ri email formatida kiriting",
    "any.required": "Email yuborilishi shart",
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(1).messages({
    "string.empty": "name bo'sh bo'lmasligi kerak",
  }),
  email: Joi.string().min(5).email().messages({
    "string.min": "email 5 ta belgidan kam bo'lmasligi kerak",
    "string.email": "To'g'ri email formatida kiriting",
  }),
})
  .min(1)
  .messages({
    "object.min": "name yoki email yuborilishi shart",
  });

const idSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "id raqam bo'lishi kerak",
    "number.positive": "id musbat bo'lishi kerak",
    "any.required": "id yuborilishi shart",
  }),
});

function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((d) => d.message).join(", ");
      return res.status(400).json({
        success: false,
        message,
      });
    }

    req.body = value;
    next();
  };
}

module.exports = {
  createUserSchema,
  updateUserSchema,
  idSchema,
  validate,
};
