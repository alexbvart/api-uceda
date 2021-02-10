import { Schema, model } from 'mongoose'

const saleDetailSchema = new Schema(

    {
        cuantity: Number,
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        sale: {
            type: Schema.Types.ObjectId,
            ref: 'Sale'
        }
    },
    {

        timestamps: true,
        versionKey: false
    }
)
export default model('SaleDetail', saleDetailSchema)