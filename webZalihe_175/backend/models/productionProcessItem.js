import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productionProcessItemScheme = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  material: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
  },
  productionProcesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionProcess",
    },
  ],
});

export default mongoose.model(
  "ProductionProcessItem",
  productionProcessItemScheme
);
