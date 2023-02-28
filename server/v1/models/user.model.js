const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  userId: Number,
  name: {
    first: { type: String, minlength: 3, maxlength: 45 },
    last: { type: String, minlength: 3, maxlength: 45 },
  },
  mobile: { type: String, minlength: 10, maxlength: 15 },
  email: {
    type: String,
    minlength: 10,
    maxlength: 100,
    unique: true,
    required: true,
  },
  password: String,
  task: String,
  role: String,
  status: Number,
  startdate: { type: Date, default: Date },
  enddate: { type: Date, default: Date },
  createdAt: { type: Date, default: Date.now },
});

userSchema.plugin(AutoIncrement, { inc_field: "userId" });

module.exports = mongoose.model("User", userSchema);
