const Joi = require('joi');

const agentRegistrationSchema = Joi.object({
  fullName: Joi.string().required().min(3).max(100),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  ).message(
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  ),
  phone: Joi.string().required().pattern(
    /^\+?[1-9]\d{1,14}$/
  ).message('Invalid phone number format'),
  whatsapp: Joi.string().pattern(
    /^\+?[1-9]\d{1,14}$/
  ).message('Invalid WhatsApp number format'),
  experience: Joi.string().required(),
  specialization: Joi.string().required(),
  location: Joi.string().required(),
  about: Joi.string().required().min(50).max(1000),
  linkedin: Joi.string().uri().allow(''),
  twitter: Joi.string().allow(''),
  instagram: Joi.string().allow('')
});

const agentUpdateSchema = Joi.object({
  fullName: Joi.string().min(3).max(100),
  phone: Joi.string().pattern(
    /^\+?[1-9]\d{1,14}$/
  ).message('Invalid phone number format'),
  whatsapp: Joi.string().pattern(
    /^\+?[1-9]\d{1,14}$/
  ).message('Invalid WhatsApp number format'),
  experience: Joi.string(),
  specialization: Joi.string(),
  location: Joi.string(),
  about: Joi.string().min(50).max(1000),
  linkedin: Joi.string().uri().allow(''),
  twitter: Joi.string().allow(''),
  instagram: Joi.string().allow('')
}).min(1);

const reviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().required().min(10).max(500),
  propertyId: Joi.string().required()
});

function validateAgentRegistration(data) {
  const result = agentRegistrationSchema.validate(data, { abortEarly: false });
  if (result.error) {
    return {
      success: false,
      errors: result.error.details.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    };
  }
  return { success: true };
}

function validateAgentUpdate(data) {
  const result = agentUpdateSchema.validate(data, { abortEarly: false });
  if (result.error) {
    return {
      success: false,
      errors: result.error.details.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    };
  }
  return { success: true };
}

function validateReview(data) {
  const result = reviewSchema.validate(data, { abortEarly: false });
  if (result.error) {
    return {
      success: false,
      errors: result.error.details.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    };
  }
  return { success: true };
}

module.exports = {
  validateAgentRegistration,
  validateAgentUpdate,
  validateReview
};
