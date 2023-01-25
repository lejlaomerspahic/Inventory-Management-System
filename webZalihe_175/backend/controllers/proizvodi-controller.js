import Product from "../models/product";
import ProductionProcess from "../models/productionProcess";

export const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find().populate({
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
  const product1 = new Product({
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
      },
    });
    const foundProcess = await ProductionProcess.findById(productionProcess);
    let price = 0;
    price += ((100 - profitMargin) / 100) * foundProcess.price;
    let roundPrice = price.toFixed(2);
    Process.price = roundPrice;
    await Process.save();
    const updatedProduct = await ProductionProcess.findByIdAndUpdate(
      productionProcess,
      { $push: { products: Process._id } },
      { new: true }
    );
    return res.status(200).json({ Process });
  } catch (err) {
    return console.log(err);
  }
};

export const updateProducts = async (req, res, next) => {
  const { name, picURL, profitMargin, productionProcess } = req.body;
  const productId = req.params.id;
  let product1;
  const foundProcess = await ProductionProcess.findById(productionProcess);
  try {
    product1 = await Product.findByIdAndUpdate(productId, {
      name,
      picURL,
      price: (((100 - profitMargin) / 100) * foundProcess.price).toFixed(2),
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
    product1 = await Product.findById(id);
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
    product1 = await Product.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!product1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
