const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is mandatory"],
      minLength: 4,
      maxLength: 18,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: [true, "EmailID name is mandatory"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password name is mandatory"],
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
