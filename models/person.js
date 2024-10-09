const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://usmantest:usmantest@clusterx.2v7zn.mongodb.net/TestBase"
);

const personSchema = mongoose.Schema({
  username: String,
  email: String,
  image: String,
});

module.exports = mongoose.model("Person", personSchema);
