const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect(
  "mongodb+srv://usmantest:usmantest@clusterx.2v7zn.mongodb.net/TestBase"
);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String,
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
