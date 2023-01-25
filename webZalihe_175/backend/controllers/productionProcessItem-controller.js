import ProductionProcessItem from "../models/productionProcessItem";
import Material from "../models/material";
import ProductionProcess from "../models/productionProcess";

export const getAllproductionProcessItems = async (req, res, next) => {
  let productionProcessItems;
  try {
    productionProcessItems = await ProductionProcessItem.find().populate(
      "material"
    );
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcessItems) {
    return res.status(404).json({ message: "No productionProcessItem found" });
  }
  return res.status(200).json({ productionProcessItems });
};

export const addproductionProcessItems = async (req, res, next) => {
  const { quantity, productionProcesses, material } = req.body;
  const productionProcessItem1 = new ProductionProcessItem({
    quantity,
    productionProcesses,
    material,
  });
  try {
    await productionProcessItem1.save();
    const updatedMaterial = await Material.findByIdAndUpdate(
      material,
      { $push: { productionProcessItems: productionProcessItem1._id } },
      { new: true }
    );
    const updatedProductionProcesses = await Promise.all(
      productionProcessItem1.productionProcesses.map(
        async (productionProcessId) => {
          return await ProductionProcess.findByIdAndUpdate(
            productionProcessId,
            { $push: { productionProcessItems: productionProcessItem1._id } },
            { new: true }
          );
        }
      )
    );
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ productionProcessItem1 });
};

export const updateproductionProcessItems = async (req, res, next) => {
  const { quantity, productionProcesses } = req.body;
  const productionProcessItemId = req.params.id;
  let productionProcessItem1;
  try {
    productionProcessItem1 = await ProductionProcessItem.findByIdAndUpdate(
      productionProcessItemId,
      {
        quantity,
        productionProcesses,
      }
    );
    const updatedProductionProcesses = await Promise.all(
      productionProcessItem1.productionProcesses.map(
        async (productionProcessId) => {
          return await ProductionProcess.findByIdAndUpdate(
            productionProcessId,
            { $push: { productionProcessItems: productionProcessItem1._id } },
            { new: true }
          );
        }
      )
    );
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcessItem1) {
    return res
      .status(500)
      .json({ message: "Unable to update the productionProcessItem" });
  }
  return res.status(200).json({ productionProcessItem1 });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let productionProcessItem1;
  try {
    productionProcessItem1 = await ProductionProcessItem.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcessItem1) {
    return res.status(404).json({ message: "No productionProcessItem found" });
  }
  return res.status(200).json({ productionProcessItem1 });
};

export const deleteproductionProcessItem = async (req, res, next) => {
  const id = req.params.id;

  let productionProcessItem1;
  try {
    productionProcessItem1 = await ProductionProcessItem.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcessItem1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
