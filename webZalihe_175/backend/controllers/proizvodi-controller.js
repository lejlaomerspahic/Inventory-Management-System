import product from "../models/product";

export const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await product.find();
  } catch (err) {
    return console.log(err);
  }
  if (!products) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ products });
};

export const addProducts = async (req, res, next) => {
  const { name, picURL, price, profitMargin, productionProcess } = req.body;
  const product1 = new product({
    name,
    picURL,
    price,
    profitMargin,
    productionProcess,
  });
  try {
    await product1.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ product1 });
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
