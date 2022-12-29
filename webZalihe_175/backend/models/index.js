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
    type: String,
    required: true,
},
profitMargin:{
    type: String,
    required: true,
}
});

export default mongoose.model("index", proizvodiSchema);

