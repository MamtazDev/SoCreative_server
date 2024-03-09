const allRoles = {
  user: ["getSetting", "manageSetting",'postSetting'],
  admin: ['getUsers', 'manageUsers', "getSetting", "manageSetting",'postSetting'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};