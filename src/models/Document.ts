import { Schema, model } from "mongoose";

const DocumentSchema = new Schema(
    {
        name: String,
        pathDocument: String,
    },{
        timestamps: true,
        versionKey: false
    }
)
export default model("DocumentUpload", DocumentSchema)