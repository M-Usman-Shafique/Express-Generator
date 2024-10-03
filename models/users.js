const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://usman:usman@cluster.wmnbp.mongodb.net/TestBase")

const userSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
