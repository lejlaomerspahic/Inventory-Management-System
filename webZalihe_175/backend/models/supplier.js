import mongoose from "mongoose";

const Schema =mongoose.Schema; 

const supplierSchema=new Schema({
    name: {
        type: String,
        required: true,
      },
    jib:  {
        type: String,
        required: true,
      },
    pdv: {
      type: Number,
      required: true,
    },
    phoneNumber:  {
        type: String,
        required: true,
      },
    contactPerson: {
        type: String,
        required: true,
      },
    email:  {
        type: String,
        required: true,
      },
    dateOfStart: {
      type: Date,
      required: true,
    },
    dateOfEnd: {
      type: Date,
    },
    materials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
      },
    ],
  });
  
  export default mongoose.model("Supplier", supplierSchema);