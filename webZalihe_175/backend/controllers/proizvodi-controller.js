import product from "../models/product";
import ProductionProcess from "../models/productionProcess";

export const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await product.find().populate({
      path: "productionProcess",
      populate: {
        path: "productionProcessItems",
        populate: { path: "material", populate: { path: "supplier" } },
      },
    });
  } catch (err) {
    return console.log(err);
  }
  if (!products) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ products });
};

export const addProducts = async (req, res, next) => {
  const { name, picURL, profitMargin, productionProcess } = req.body;
  const product1 = new product({
    name,
    picURL,
    profitMargin,
    productionProcess,
  });
  try {
    const Process = await (
      await product1.save()
    ).populate({
      path: "productionProcess",
      populate: {
        path: "productionProcessItems",
        populate: { path: "material", populate: { path: "supplier" } },
      },
    });

    const foundProcess = await ProductionProcess.findById(productionProcess);
    let price = 0;
    price += ((100 - profitMargin) / 100) * foundProcess.price;
    Process.price = price;
    await Process.save();
    return res.status(200).json({ Process });
  } catch (err) {
    return console.log(err);
  }
};

export const updateProducts = async (req, res, next) => {
  const { name, picURL, price, profitMargin, productionProcess } = req.body;
  const productId = req.params.id;
  let product1;
  try {
    product1 = await product.findByIdAndUpdate(productId, {
      name,
      picURL,
      price,
      profitMargin,
      productionProcess,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!product1) {
    return res.status(500).json({ message: "Unable to update the product" });
  }
  return res.status(200).json({ product1 });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let product1;
  try {
    product1 = await product.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!product1) {
    return res.status(404).json({ message: "No product found" });
  }
  return res.status(200).json({ product1 });
};

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  let product1;
  try {
    product1 = await product.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!product1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
