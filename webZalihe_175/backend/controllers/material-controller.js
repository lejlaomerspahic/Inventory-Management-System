import material from "../models/material";

export const getAllMaterials = async (req, res, next) => {
  let materials;
  try {
    materials = await material.find().populate("supplier");
  } catch (err) {
    return console.log(err);
  }
  if (!materials) {
    return res.status(404).json({ message: "No material found" });
  }
  return res.status(200).json({ materials });
};

export const addMaterials = async (req, res, next) => {
  const { name,
    quantity,
    minQuantity,
    price,
    unitOfMeasure,
    isUsed,
    supplier } = req.body;
  const material1 = new material({
    name,
    quantity,
    minQuantity,
    price,
    unitOfMeasure,
    isUsed,
    supplier
  });
  try {
    await material1.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ material1 });
};

export const updateMaterials = async (req, res, next) => {
  const { name,
    quantity,
    minQuantity,
    price,
    unitOfMeasure,
    isUsed,
    supplier } = req.body;
  const materialId = req.params.id;
  let material1;
  try {
    material1 = await material.findByIdAndUpdate(materialId, {
        name,
        quantity,
        minQuantity,
        price,
        unitOfMeasure,
        isUsed,
        supplier
    });
  } catch (err) {
    return console.log(err);
  }
  if (!material1) {
    return res.status(500).json({ message: "Unable to update the material" });
  }
  return res.status(200).json({ material1 });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let material1;
  try {
    material1 = await material.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!material1) {
    return res.status(404).json({ message: "No material found" });
  }
  return res.status(200).json({ material1 });
};

export const deleteMaterial = async (req, res, next) => {
  const id = req.params.id;

  let material1;
  try {
    material1 = await material.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!material1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
