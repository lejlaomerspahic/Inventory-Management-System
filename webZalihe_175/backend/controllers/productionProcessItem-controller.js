import productionProcessItem from "../models/productionProcessItem";

export const getAllproductionProcessItems = async (req, res, next) => {
  let productionProcessItems;
  try {
    productionProcessItems = await productionProcessItem.find();
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcessItems) {
    return res.status(404).json({ message: "No productionProcessItem found" });
  }
  return res.status(200).json({ productionProcessItems });
};

export const addproductionProcessItems = async (req, res, next) => {
  const { quantity, productionProcesses } = req.body;
  const productionProcessItem1 = new productionProcessItem({
    quantity,
    productionProcesses
  });
  try {
    await productionProcessItem1.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ productionProcessItem1 });
};

export const updateproductionProcessItems = async (req, res, next) => {
  const {quantity,productionProcesses} = req.body;
  const productionProcessItemId = req.params.id;
  let productionProcessItem1;
  try {
    productionProcessItem1 = await productionProcessItem.findByIdAndUpdate(productionProcessItemId, {
        quantity,
        productionProcesses
    });
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcessItem1) {
    return res.status(500).json({ message: "Unable to update the productionProcessItem" });
  }
  return res.status(200).json({ productionProcessItem1 });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let productionProcessItem1;
  try {
    productionProcessItem1 = await productionProcessItem.findById(id);
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
    productionProcessItem1 = await productionProcessItem.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcessItem1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
