import ProductionProcess from "../models/productionProcess";
import ProductionProcessItem from "../models/productionProcessItem";
import Product from "../models/product";

export const getAllproductionProccess = async (req, res, next) => {
  let productionProcesss;
  try {
    productionProcesss = await ProductionProcess.find().populate(
      "productionProcessItems"
    );
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcesss) {
    return res.status(404).json({ message: "No productionProcess found" });
  }
  return res.status(200).json({ productionProcesss });
};

export const addproductionProcess = async (req, res, next) => {
  const { name, startDate, endDate, products, productionProcessItems } =
    req.body;
  const productionProcess1 = new ProductionProcess({
    name,
    startDate,
    endDate,
    products,
    productionProcessItems,
  });
  try {
    const Item = await (
      await productionProcess1.save()
    ).populate({
      path: "productionProcessItems",
      populate: { path: "material" },
    });
    const updatedProductionProcessItems = await Promise.all(
      Item.productionProcessItems.map(async (productionProcessItemId) => {
        return await ProductionProcessItem.findByIdAndUpdate(
          productionProcessItemId,
          { $push: { productionProcesses: Item._id } },
          { new: true }
        );
      })
    );
    const updatedProduct = await Promise.all(
      Item.products.map(async (productId) => {
        return await Product.findByIdAndUpdate(
          productId,
          { $push: { productionProcess: Item._id } },
          { new: true }
        );
      })
    );
    let price = 0;
    Item.productionProcessItems.map(
      (item) => (price += (item.quantity * item.material.price).toFixed(2))
    );
    Item.price = price;
    await Item.save();

    return res.status(200).json({ Item });
  } catch (err) {
    return console.log(err);
  }
};

export const updateproductionProcess = async (req, res, next) => {
  const {
    name,
    quantity,
    startDate,
    endDate,
    price,
    products,
    productionProcessItems,
  } = req.body;
  const productionProcessId = req.params.id;
  let productionProcess1;
  try {
    productionProcess1 = await ProductionProcess.findByIdAndUpdate(
      productionProcessId,
      {
        name,
        quantity,
        startDate,
        endDate,
        price,
        products,
        productionProcessItems,
      }
    );
    const updatedProduct = await Promise.all(
      productionProcess1.products.map(async (productId) => {
        return await Product.findByIdAndUpdate(
          productId,
          { $push: { productionProcess: productionProcess1._id } },
          { new: true }
        );
      })
    );
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcess1) {
    return res
      .status(500)
      .json({ message: "Unable to update the productionProcess" });
  }
  return res.status(200).json({ productionProcess1 });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let productionProcess1;
  try {
    productionProcess1 = await ProductionProcess.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcess1) {
    return res.status(404).json({ message: "No productionProcess found" });
  }
  return res.status(200).json({ productionProcess1 });
};

export const deleteproductionProcess = async (req, res, next) => {
  const id = req.params.id;

  let productionProcess1;
  try {
    productionProcess1 = await ProductionProcess.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcess1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
