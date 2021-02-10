import { Schema, model } from "mongoose";
const CoustomerSchema = new Schema(
    {
        name: String,
        lastname: String,
        dni: String,
        phone: String,
        adress: String
    },
    {

        timestamps: true,
        versionKey: false,
    }
);
export default model("coustomer", CoustomerSchema);