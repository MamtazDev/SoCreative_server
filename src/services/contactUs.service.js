const ContactUs = require('../models/contactUs.model');
const TestUser = require('../models/testUser.model');
const replyMessages = require('../utils/autoReplyMessage');

const sentMessage = async (userId, requestedBody) => {
  const { message, contactId } = requestedBody;

  let contact = await ContactUs.findById(contactId);

  if (!contact) {
    contact = new ContactUs({ helpSeeker: userId });
  }

  contact.messages.push({
    sender: userId,
    message: message,
  });

  const updatedContact = await contact.save();

  return updatedContact;
};

const autoReply = async (userId, requestedBody) => {
  const { messageType, contactId } = requestedBody;
  let contact = await ContactUs.findById(contactId);

  if (!contact) {
    contact = new ContactUs({ helpSeeker: userId });
  }

  const generateMessage = replyMessages.find((m) => m.title === messageType);

  const admins = await TestUser.find({ role: 'ADMIN' });

  const randomIndex = Math.floor(Math.random() * admins.length);
  const randomAdmin = admins[randomIndex];

  contact.messages.push({
    sender: randomAdmin?._id,
    message: generateMessage?.message,
  });

  const updatedContact = await contact.save();

  return updatedContact;
};

const getUserContactMessage = async (userId) => {
  const contact = await ContactUs.findOne({ helpSeeker: userId }).populate([
    {
      path: 'messages',
      populate: {
        path: 'sender',
        select: '-password',
      },
    },
  ]);
  return contact;
};

const getContactMessageById = async (contactId) => {
  const contact = await ContactUs.findById(contactId)
    .populate({ path: 'helpSeeker', select: '-password' })
    .populate([
      {
        path: 'messages',
        populate: {
          path: 'sender',
          select: '-password -email',
        },
      },
    ]);
  return contact;
};

const getAllContactMessage = async () => {
  const contacts = await ContactUs.find().populate({ path: 'helpSeeker', select: '-password' }).sort({ createdAt: -1 });
  return contacts;
};

module.exports = {
  sentMessage,
  autoReply,
  getUserContactMessage,
  getContactMessageById,
  getAllContactMessage,
};
