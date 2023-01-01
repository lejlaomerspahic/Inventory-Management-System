import mongoose from "mongoose";

const Schema=mongoose.Schema;
const RoleSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
});

export default mongoose.model("Role", RoleSchema);