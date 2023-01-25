import Supplier from "../models/supplier";
import Material from "../models/material";

export const getAllSuppliers = async (req, res, next) => {
  let suppliers;
  try {
    suppliers = await Supplier.find().populate("materials");
  } catch (err) {
    return console.log(err);
  }
  if (!suppliers) {
    return res.status(404).json({ message: "No supplier found" });
  }
  return res.status(200).json({ suppliers });
};

export const addSuppliers = async (req, res, next) => {
  const {
    name,
    jib,
    pdv,
    phoneNumber,
    contactPerson,
    email,
    dateOfStart,
    dateOfEnd,
    materials,
  } = req.body;
  const supplier1 = new Supplier({
    name,
    jib,
    pdv,
    phoneNumber,
    contactPerson,
    email,
    dateOfStart,
    dateOfEnd,
    materials,
  });
  try {
    await supplier1.save();
    const updateMaterials = await Promise.all(
      supplier1.materials.map(async (materialId) => {
        return await Material.findByIdAndUpdate(
          materialId,
          { $push: { supplier: supplier1._id } },
          { new: true }
        );
      })
    );
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ supplier1 });
};

export const updatesuppliers = async (req, res, next) => {
  const {
    name,
    jib,
    pdv,
    phoneNumber,
    contactPerson,
    email,
    dateOfStart,
    dateOfEnd,
    materials,
  } = req.body;
  const supplierId = req.params.id;
  let supplier1;
  try {
    supplier1 = await Supplier.findByIdAndUpdate(supplierId, {
      name,
      jib,
      pdv,
      phoneNumber,
      contactPerson,
      email,
      dateOfStart,
      dateOfEnd,
      materials,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!supplier1) {
    return res.status(500).json({ message: "Unable to update the supplier" });
  }
  return res.status(200).json({ supplier1 });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let supplier1;
  try {
    supplier1 = await Supplier.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!supplier1) {
    return res.status(404).json({ message: "No supplier found" });
  }
  return res.status(200).json({ supplier1 });
};

export const deletesupplier = async (req, res, next) => {
  const id = req.params.id;

  let supplier1;
  try {
    supplier1 = await Supplier.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!supplier1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
