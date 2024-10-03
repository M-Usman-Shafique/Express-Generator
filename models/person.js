const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://usman:usman@cluster.wmnbp.mongodb.net/TestBase"
);

const personSchema = mongoose.Schema({
  username: String,
  email: String,
  image: String,
});

module.exports = mongoose.model("Person", personSchema);