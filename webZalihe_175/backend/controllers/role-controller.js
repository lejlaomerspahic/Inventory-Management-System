import role from "../models/role";

export const getAllroles = async (req, res, next) => {
  let roles;
  try {
    roles = await role.find();
  } catch (err) {
    return console.log(err);
  }
  if (!roles) {
    return res.status(404).json({ message: "No role found" });
  }
  return res.status(200).json({ roles });
};

export const addroles = async (req, res, next) => {
  const { name, jib, pdv,   phoneNumber, contactPerson, email, dateOfStart, dateOfEnd,materials } = req.body;
  const role1 = new role({
    name, 
    jib, 
    pdv,
    phoneNumber, 
    contactPerson, 
    email, 
    dateOfStart,   
    dateOfEnd,
    materials
  });
  try {
    await role1.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ role1 });
};

export const updateroles = async (req, res, next) => {
  const {name, users } = req.body;
  const roleId = req.params.id;
  let role1;
  try {
    role1 = await role.findByIdAndUpdate(roleId, {
    name, 
    users
    });
  } catch (err) {
    return console.log(err);
  }
  if (!role1) {
    return res.status(500).json({ message: "Unable to update the role" });
  }
  return res.status(200).json({ role1 });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let role1;
  try {
    role1 = await role.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!role1) {
    return res.status(404).json({ message: "No role found" });
  }
  return res.status(200).json({ role1 });
};

export const deleterole = async (req, res, next) => {
  const id = req.params.id;

  let role1;
  try {
    role1 = await role.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!role1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
