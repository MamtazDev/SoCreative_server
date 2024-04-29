const Notification = require('../models/notification.modal');

const createNotification = async (body) => {
  const result = await Notification.create(body);

  return result;
};

const getAllNotification = async (user, page = 1, limit = 6) => {
  const totalCount = await Notification.countDocuments({ user: user?._id });

  const notifications = await Notification.find({ user: user?._id })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const groupedNotifications = notifications.reduce((acc, notification) => {
    const date = notification.createdAt.toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {});

  const notificationsList = Object.keys(groupedNotifications).map((date) => ({
    date,
    lists: groupedNotifications[date],
  }));

  const meta_data = {
    currentPage: page,
    limit,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
  };

  return { notificationsList, meta_data };
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
