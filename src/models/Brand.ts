import { Schema, model } from "mongoose";

const brandSchema = new Schema(
    {
        name: String,
    },
    {

        timestamps: true,
        versionKey: false,
    }
);
export default model("Brand", brandSchema);