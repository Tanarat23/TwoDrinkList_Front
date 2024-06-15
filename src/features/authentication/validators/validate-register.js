import Joi from 'joi';

const registerSchema = Joi.object({
  userName: Joi.string()
    .required()
    .trim()
    .messages({ 'string.empty': 'User name is required' }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .messages({
      'string.empty': 'Password is required',
      'string.pattern.base':
        'password must be at least 6 characters ande contain only alphabet and number.',
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .strip()
    .messages({
      'string.empty': 'Confirmpassword is required',
      'any.only': 'Password did not match',
    }),

  email: Joi.string().email({ tlds: false }),
  profileImage: Joi.string().uri(),
  birthDate: Joi.date()
    .required()
    .messages({ 'string.empty': 'Birthdate is required' }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateRegister;
