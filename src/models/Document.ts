import { Schema, model, Document } from "mongoose";

const DocumentSchema = new Schema(
    {
        name: String,
        pathDocument: String,
    }, {
    timestamps: true,
    versionKey: false
}
)

export interface IDocument extends Document {

    name: string;
    pathDocument: string;
}

export default model<IDocument>('DocumentUpload', DocumentSchema);

