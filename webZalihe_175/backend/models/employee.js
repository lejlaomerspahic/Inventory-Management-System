import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeScheme = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfJoin: {
    type: Date,
    required: true,
  },
  dateOfLeave: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Employee", employeeScheme);
