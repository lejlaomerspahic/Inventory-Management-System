import mongoose from "mongoose";

const Schema =mongoose.Schema;

const proizvodiSchema=new Schema({
name: {
    type: String,
    required: true,
},
picURL:{
    type: String,
    required: true,
},
price: {
    type: Number,
    required: true,
},
profitMargin:{
    type: Number,
    required: true,
},
productionProcess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductionProcess",
}
});

export default mongoose.model("product", proizvodiSchema);

