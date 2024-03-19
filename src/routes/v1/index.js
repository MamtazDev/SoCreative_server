const express = require('express');
const config = require('../../config/config');

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const driveRoute = require('./drive.route');
const testAuthRoute = require('./testAuth.route');
const projectRoute = require('./project.route');
const brandKitRoute = require('./brandKit.route');
const vimeoRoute = require('./vimeo.route');
const notificationRoute = require('./notification.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    // route: authRoute,
    route: testAuthRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/drive',
    route: driveRoute,
  },
  {
    path: '/project',
    route: projectRoute,
  },
  {
    path: '/brand-Kit',
    route: brandKitRoute,
  },
  {
    path: '/vimeo',
    route: vimeoRoute,
  },
  {
    path: '/notification',
    route: notificationRoute,
  }
];

const devRoutes = [ 
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
