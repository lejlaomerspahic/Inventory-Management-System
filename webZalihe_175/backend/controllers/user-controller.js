
import user from "../models/user";
import Role from "../models/role";
import Employee from "../models/employee";
import Material from "../models/material";
import ProductionProcess from "../models/productionProcess";
import ProductionProcessItem from "../models/productionProcessItem";
import Suppplier from "../models/supplier";

import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await user.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exist!" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  const User = new user({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await User.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ User });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Couldn't find user by this email!" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect Password",
    });
  }
  return res.status(200).json({ message: "Login successfull", user: existingUser});
};
