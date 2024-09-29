import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    qualification: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
