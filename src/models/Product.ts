import { Schema, model } from 'mongoose';

const productSchema = new Schema(
    {

        name: String,
        description: String,
        price: Number,
        stock: Number,
        estatus: Boolean,
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: "Brand",
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('Product', productSchema)