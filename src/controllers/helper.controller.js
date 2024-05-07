/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { sendInviteMail } = require('../helpers/sendEmails/sendInviteEmail');
const { generateInviteToken, decodeInviteToken } = require('../helpers/jwtHelper');

const sendInvite = catchAsync(async (req, res) => {
  for (let i = 0; i < req.body.emails.length; i++) {
    const email = req.body.emails[i];
    const token = await generateInviteToken({ email, role: req.body.role });
    const result = await sendInviteMail({ email, role: req.body.role }, token);
  }
  res.status(httpStatus.OK).send({ message: 'Invite Success', success: true, data: null });
});

const verifyInviteToken = catchAsync(async (req, res) => {
  const decodeResult = await decodeInviteToken(req.body.token);
  if (decodeResult?.success && decodeResult?.data?.email) {
    res.status(httpStatus.OK).send({ message: 'Invite Success', success: true, data: decodeResult?.data });
  } else {
    res.status(201).send({ message: 'Token is Expired', expired: true, success: false, data: null });
  }
});

module.exports = {
  sendInvite,
  verifyInviteToken,
};
