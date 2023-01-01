import mongoose from "mongoose";

const Schema =mongoose.Schema;

const ProductionProcess=new Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  productionProcessItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionProcessItem",
    },
  ],
});

export default mongoose.model("ProductionProcess", ProductionProcess);