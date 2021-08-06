import { Schema, model, Document } from "mongoose";

const DocumentSchema = new Schema(
    {
        name: String,
        pathDocument: String,
        process: {
            type: Schema.Types.ObjectId,
            ref: 'ProcessDocument'
        },
        type: {
            type: Schema.Types.ObjectId,
            ref: 'TypeDocument'
        },
        status: {
            type: Schema.Types.ObjectId,
            ref: 'StatusDocument'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export interface IDocument extends Document {

    name: string;
    pathDocument: string;
}

export default model<IDocument>('DocumentUpload', DocumentSchema);

