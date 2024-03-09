const Joi = require('joi');
const { password, objectId } = require('./custom.validation');


const createSetting = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSetting = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateSetting = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};



module.exports = {
 

  createSetting,
  getSetting,
  updateSetting
};
