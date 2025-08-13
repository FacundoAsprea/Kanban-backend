const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  date: String,
  status: String,
  tags: Array,
  username: String,
});

TaskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.taskId = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = new mongoose.model("Task", TaskSchema);
