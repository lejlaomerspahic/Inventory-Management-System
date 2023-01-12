import employee from "../models/employee";

export const getAllemployees = async (req, res, next) => {
  let employees;
  try {
    employees = await employee.find();
  } catch (err) {
    return console.log(err);
  }
  if (!employees) {
    return res.status(404).json({ message: "No employee found" });
  }
  return res.status(200).json({ employees });
};

export const addemployees = async (req, res, next) => {
  const { firstName, lastName, phoneNumber, email, dateOfJoin, dateOfLeave } =
    req.body;
  const employee1 = new employee({
    firstName,
    lastName,
    phoneNumber,
    email,
    dateOfJoin,
    dateOfLeave,
  });
  try {
    await employee1.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ employee1 });
};

export const updateemployees = async (req, res, next) => {
  const { firstName, lastName, phoneNumber, email, dateOfJoin, dateOfLeave } =
    req.body;
  const employeeId = req.params.id;
  let employee1;
  try {
    employee1 = await employee.findByIdAndUpdate(employeeId, {
      firstName,
      lastName,
      phoneNumber,
      email,
      dateOfJoin,
      dateOfLeave,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!employee1) {
    return res.status(500).json({ message: "Unable to update the employee" });
  }
  return res.status(200).json({ employee1 });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let employee1;
  try {
    employee1 = await employee.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!employee1) {
    return res.status(404).json({ message: "No employee found" });
  }
  return res.status(200).json({ employee1 });
};

export const deleteemployee = async (req, res, next) => {
  const id = req.params.id;

  let employee1;
  try {
    employee1 = await employee.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!employee1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
