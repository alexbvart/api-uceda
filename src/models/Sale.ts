import { Schema, model } from 'mongoose'

const saleSchema = new Schema(
    {
        date: String,
        total: Number,
        client: {
            type: Schema.Types.ObjectId,
            ref: 'Coustomer'
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
)

export default model('Sale', saleSchema)