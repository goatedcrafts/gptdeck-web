import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "Username already exists!"],
    trim: true,
    match: [
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 3-20 alphanumeric letters and be unique!",
    ],
  },
  displayName: {
    type: String,
    required: [true, "Display name is required!"],
    trim: true,
    minlength: [2, "Display name must be at least 2 characters long"],
    maxlength: [50, "Display name cannot exceed 50 characters"],
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = models.User || model("User", UserSchema);

export default User;
