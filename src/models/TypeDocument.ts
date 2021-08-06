import { Schema, model } from "mongoose";

const  TypeDocumentSchema = new Schema(

    {
        name: String,
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model("TypeDocument", TypeDocumentSchema)