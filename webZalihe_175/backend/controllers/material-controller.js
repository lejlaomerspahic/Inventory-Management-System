import Material from "../models/material";
import Supplier from "../models/supplier";
import ProductionProcessItem from "../models/productionProcessItem";
import Product from "../models/product";
import ProductionProcess from "../models/productionProcess";

export const getAllMaterials = async (req, res, next) => {
  let materials;
  try {
    materials = await Material.find().populate("supplier");
  } catch (err) {
    return console.log(err);
  }
  if (!materials) {
    return res.status(404).json({ message: "No material found" });
  }
  return res.status(200).json({ materials });
};

export const addMaterials = async (req, res, next) => {
  const {
    name,
    quantity,
    minQuantity,
    price,
    unitOfMeasure,
    isUsed,
    supplier,
    productionProcessItems,
  } = req.body;
  const material1 = new Material({
    name,
    quantity,
    minQuantity,
    price,
    unitOfMeasure,
    isUsed,
    supplier,
    productionProcessItems,
  });
  try {
    await material1.save();
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplier,
      { $push: { materials: material1._id } },
      { new: true }
    );
    const updatedProductionProcessItems = await Promise.all(
      material1.productionProcessItems.map(async (productionProcessItemId) => {
        return await ProductionProcessItem.findByIdAndUpdate(
          productionProcessItemId,
          { $push: { productionProcessItems: material1._id } },
          { new: true }
        );
      })
    );
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ material1 });
};

export const updateMaterials = async (req, res, next) => {
  const {
    name,
    quantity,
    minQuantity,
    price,
    unitOfMeasure,
    isUsed,
    supplier,
    productionProcessItems,
  } = req.body;
  const materialId = req.params.id;
  let material1;
  try {
    material1 = await Material.findByIdAndUpdate(
      materialId,
      {
        name,
        quantity,
        minQuantity,
        price,
        unitOfMeasure,
        isUsed,
        supplier,
        productionProcessItems,
      },
      { new: true }
    );
    for (const productionProcessItemId of material1.productionProcessItems) {
      const productionProcessItem = await ProductionProcessItem.findById(
        productionProcessItemId
      );
      if (!productionProcessItem) {
        return res
          .status(404)
          .json({ message: "Production Process Item not found" });
      }
      for (const productionProcessId of productionProcessItem.productionProcesses) {
        const productionProcess = await ProductionProcess.findById(
          productionProcessId
        );
        if (!productionProcess) {
          return res
            .status(404)
            .json({ message: "Production Process not found" });
        }
        const newPrice = productionProcessItems.quantity * material1.price;
        productionProcess.price = newPrice;
        await productionProcess.save();

        for (const productId of productionProcess.products) {
          const product = await Product.findById(productId);
          if (!product) {
            return res.status(404).json({ message: "Product not found" });
          }
          const newProductPrice =
            newPrice * ((100 - product.profitMargin) / 100);
          product.price = newProductPrice;
          await product.save();
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to update the material" });
  }
  return res.status(200).json({ material1 });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let material1;
  try {
    material1 = await Material.findById(id);
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
    material1 = await Material.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!material1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
