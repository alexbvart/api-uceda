import { Schema, model } from "mongoose";

const ProcessDocumentSchema = new Schema(

    {
        name: String,
        priority: Number
    },
    {
        timestamps: true,
        versionKey: false
    }

)

export default model("ProcessDocument", ProcessDocumentSchema)