import user from "../models/user";

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
  const { name, password, role, employee } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ name });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exist!" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  const User = new user({
    name,
    password: hashedPassword,
    role,
    employee,
  });

  try {
    await User.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ User });
};

export const login = async (req, res, next) => {
  const { name, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ name });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Couldn't find user by this name!" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect Password",
    });
  }
  return res
    .status(200)
    .json({ message: "Login successfull", user: existingUser });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let user1;
  try {
    user1 = await user.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user1) {
    return res.status(404).json({ message: "No user found" });
  }
  return res.status(200).json({ user1 });
};

export const updateUser = async (req, res, next) => {
  const { name, password } = req.body;
  const userId = req.params.id;
  let user1;
  try {
    user1 = await user.findByIdAndUpdate(userId, {
      name,
      password,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!user1) {
    return res.status(500).json({ message: "Unable to update the user" });
  }
  return res.status(200).json({ user1 });
};
