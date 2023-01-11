import productionProcess from "../models/productionProcess";

export const getAllproductionProccess = async (req, res, next) => {
  let productionProcesss;
  try {
    productionProcesss = await productionProcess
      .find()
      .populate("productionProcessItems");
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcesss) {
    return res.status(404).json({ message: "No productionProcess found" });
  }
  return res.status(200).json({ productionProcesss });
};

export const addproductionProcess = async (req, res, next) => {
  const { name, startDate, endDate, productionProcessItems } = req.body;
  const productionProcess1 = new productionProcess({
    name,
    startDate,
    endDate,
    productionProcessItems: productionProcessItems,
  });
  try {
    const Item = await (
      await productionProcess1.save()
    ).populate({
      path: "productionProcessItems",
      populate: { path: "material" },
    });
    let price = 0;
    Item.productionProcessItems.map(
      (item) => (price += item.quantity * item.material.price)
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
    productionProcess1 = await productionProcess.findByIdAndUpdate(
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
    productionProcess1 = await productionProcess.findById(id);
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
    productionProcess1 = await productionProcess.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!productionProcess1) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};
