const restaurants = require('./restaurants/restaurants.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(restaurants);
  app.configure(users);
};
