const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required,
      trim: true,
    },
    password: {
      type: String,
      required,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

const validateRegisterUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    password: Joi.string().required(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(obj);
};

const validateLoginUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().required(),
  });
  return schema.validate(obj);
};

const validateUpdateUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim(),
    username: Joi.string().trim(),
    password: Joi.string().required(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(obj);
};

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
