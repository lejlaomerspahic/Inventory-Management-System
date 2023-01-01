import mongoose from "mongoose";

const Schema =mongoose.Schema;

const materialSchema=new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  minQuantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unitOfMeasure: {
    type: String,
    required: true,
  },
  isUsed: {
    type: Boolean,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  }
});

export default mongoose.model("Material", materialSchema);