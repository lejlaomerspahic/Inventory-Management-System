import mongoose from "mongoose";

const Schema =mongoose.Schema;

const productionProcessItemScheme=new Schema({
  quantity: { 
    type: Number,
    required: true,
  },
  productionProcesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionProcess",
    },
  ],
});

export default mongoose.model(
  "ProductionProcessItem",productionProcessItemScheme);