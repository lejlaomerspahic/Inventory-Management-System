import index from "../models/index";

export const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await index.find();
  } catch (err) {
    return console.log(err);
  }
  if (!products) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ products });
};

export const addProducts = async (req, res, next) => {
  const { name, picURL, price, profitMargin } = req.body;
  const product = new index({
    name,
    picURL,
    price,
    profitMargin,
  });
  try {
    await product.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ product });
};

export const updateProducts = async (req, res, next) => {
  const { name, picURL, price, profitMargin } = req.body;
  const productId = req.params.id;
  let product;
  try {
    product = await index.findByIdAndUpdate(productId, {
      name,
      picURL,
      price,
      profitMargin,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!product) {
    return res.status(500).json({ message: "Unable to update the product" });
  }
  return res.status(200).json({ product });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await index.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "No product found" });
  }
  return res.status(200).json({ product });
};

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  let product;
  try {
    product = await index.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!product) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
