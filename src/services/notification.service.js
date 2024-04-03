const Notification = require('../models/notification.modal');





const createNotification = async (body) => {
  const result = await Notification.create(body);
  
  return result;
};

const getAllNotification = async (id) => {

  console.log("id:", id)

  const result = await Notification.find({user:id});
  
  return result;
};

// const getNotificationInfo = async (id) => {
//   const result = await Notification.findById(id);

//   return result;
// };


const deleteNotification = async (id) => {
  const result = await Notification.findByIdAndDelete(id);
  
  return result;
};

module.exports = {
  createNotification,
  getAllNotification,
  deleteNotification,
};
