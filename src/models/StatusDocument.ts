import { Schema, model } from "mongoose";

const StatusDocumentSchema = new Schema(

    {
        name: String,
    },
    {
        timestamps: true,
        versionKey: false
    }

)

export default model("StatusDocument", StatusDocumentSchema)