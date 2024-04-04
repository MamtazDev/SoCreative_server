const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { contactUsService } = require('../services');

const makeContact = catchAsync(async (req, res) => {
  const contact = await contactUsService.sentMessage(req.user._id, req.body);
  res.status(httpStatus.CREATED).send({ message: 'Message sent successfully!', success: true, data: contact });
});

const generateAutoReply = catchAsync(async (req, res) => {
  const contact = await contactUsService.autoReply(req.user._id, req.body);
  res.status(httpStatus.CREATED).send({ message: 'Message sent successfully!', success: true, data: contact });
});

const userContactMessage = catchAsync(async (req, res) => {
  const contact = await contactUsService.getUserContactMessage(req.user._id);
  res.status(httpStatus.CREATED).send(contact);
});

const contactMessgeById = catchAsync(async (req, res) => {
  const contact = await contactUsService.getContactMessageById(req.params.id);
  res.status(httpStatus.CREATED).send(contact);
});

const allContactMessage = catchAsync(async (req, res) => {
  const contacts = await contactUsService.getAllContactMessage();
  res.status(httpStatus.CREATED).send(contacts);
});

module.exports = {
  makeContact,
  generateAutoReply,
  userContactMessage,
  contactMessgeById,
  allContactMessage,
};
