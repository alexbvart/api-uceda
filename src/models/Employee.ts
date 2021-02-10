import { Schema, model } from 'mongoose'

const EmployeeSchema = new Schema(
    {
        name: String,
        lastname: String,
        dni: String,
        email: String,
        phone: String,
        birth: String,
        workstation:{
            type: Schema.Types.ObjectId,
            ref: 'Workstation'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {

        timestamps: true,
        versionKey: false,
    }
);
export default model("Employee", EmployeeSchema);
