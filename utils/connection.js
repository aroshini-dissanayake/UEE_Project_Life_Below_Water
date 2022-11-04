const mongoose = require("mongoose");

const connection = async () => {
    const MongoURL = process.env.MONGODB_URL;

    mongoose.connect(MongoURL, (err) => {
      if (err) {
        console.error(err);
        process.exit(-1);
      }
      console.log("Successfully connected to MongoDB");
    });
};

module.exports = { connection };
