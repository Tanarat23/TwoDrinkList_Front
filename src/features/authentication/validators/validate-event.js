import Joi from 'joi';

// const initialInput = {
//   eventName: '',
//   location: '',
//   date: '',
//   description: '',
//   joinLimit: '',
//   category: '',
// };
const eventSchema = Joi.object({
  // eventName: Joi.string()
  //   .required()
  //   .trim()
  //   .messages({ 'string.empty': 'Event name is required' }),
  locationId: Joi.string()
    .required()
    .trim()
    .pattern(/^[0-9]{1,}$/)
    .messages({
      'string.empty': 'Location is required',
    }),
  dueDate: Joi.date()
    .required()
    .messages({ 'string.empty': 'Date is required' }),

  description: Joi.string(),
  joinLimit: Joi.number().required().messages({
    'string.empty': 'Joinlimit is required',
  }),
  categoryId: Joi.string()
    .required()
    .pattern(/^[0-9]{1,}$/)
    .messages({ 'string.empty': 'Category is required' }),
  // userId: Joi.messages({ 'string.empty': 'Category is required' }),
});

const validateEvent = (input) => {
  const { error } = eventSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      console.log(el.path[0]);
      return acc;
    }, {});
    return result;
  }
};

export default validateEvent;
