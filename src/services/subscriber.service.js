const Subscriber = require("../models/Subscriber");

const newSubscriber = async (data) => {
  const subscriber = new Subscriber(data);
  return await subscriber.save();
};

module.exports = {
  newSubscriber,
};
