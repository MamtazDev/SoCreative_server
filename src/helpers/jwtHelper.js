/* eslint-disable prettier/prettier */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateInviteToken = async (data) => {
  return jwt.sign(
    {
      email: data?.email,
      role: data?.role,
    },
    config.access_token_secret,
    {
      expiresIn: '7days',
    }
  );
};

const decodeInviteToken = async (token) => {
  const result = await jwt.verify(token, config.access_token_secret, function (err, decoded) {
    return { err, decoded };
  });

  if (!!result?.err) {
    return {
      status: 403,
      success: false,
      message: 'unauthorized',
      data: null,
    };
  } else {
    return {
      status: 200,
      success: true,
      message: 'Token Decode Success',
      data: result?.decoded,
    };
  }
};

module.exports = {
  generateInviteToken,
  decodeInviteToken,
};
