import { Schema, model } from 'mongoose'

const WorkstationSchema = new Schema(
    {
        name: String,
    },
    {

        timestamps: true,
        versionKey: false,
    }
);
export default model("Workstation", WorkstationSchema);