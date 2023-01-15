import Employee from "../models/employee";
import User from "../models/user";

export const getAllemployees = async (req, res, next) => {
  let employees;
  try {
    employees = await Employee.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!employees) {
    return res.status(404).json({ message: "No employee found" });
  }
  return res.status(200).json({ employees });
};

export const addEmployees = async (req, res, next) => {
  const employee1 = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    dateOfJoin: req.body.dateOfJoin,
    dateOfLeave: req.body.dateOfLeave,
  });
  employee1
    .save()
    .then((savedEmployee) => {
      const user = new User({
        name: req.body.name,
        password: req.body.password,
        role: "zaposlenik",
        employee: savedEmployee._id,
      });
      user
        .save()
        .then((user) => {
          user.employee = savedEmployee._id;
          res.json(user);
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const updateEmployees = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");

    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.phoneNumber = req.body.phoneNumber;
    employee.email = req.body.email;
    employee.dateOfJoin = req.body.dateOfJoin;
    employee.dateOfLeave = req.body.dateOfLeave;

    const user = await User.findById(employee.user);
    user.name = req.body.name;
    user.password = req.body.password;

    await employee.save();
    await user.save();

    res.send(employee);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let employee1;
  try {
    employee1 = await Employee.findById(id).populate("user");
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
    employee1 = await Employee.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!employee1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
