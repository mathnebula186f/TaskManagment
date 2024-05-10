
const mongoose = require("mongoose");
const conn = async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONGOOSE_URL}`);
    if (response) {
      console.log("Connected to Mongoose");
    }
  } catch (error) {
    console.log("Error in Connection to Mongoose:", error);
  }
};

conn();