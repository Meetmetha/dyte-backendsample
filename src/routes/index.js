const express = require('express');
const meetingRoute = require('./meeting.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/meeting',
    route: meetingRoute, //Meeting Route
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
