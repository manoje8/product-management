import { model, Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true },
        category: { type: String, enum: ["Electronics", "Metal", "Clothing"], required: true },
        description: { type: String, required: true },
        status: { type: Boolean, default: false },
        basePrice: { type: String, enum: ["USD", "INR", "EUR"], required: true },
        discount: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        stockQuantity: { type: Number, required: true },
        minOrderQuantity: { type: Number, default: 1 },
        restock: { type: Number, default: 0 },
        specification: { type: [String], default: [] },
        mediaId: { type: Schema.Types.ObjectId, ref: "media" },
    },
    {
        timestamps: true,
        collection: "products",
        versionKey: false
    }
)

const productModel = model("products", productSchema)

export default productModel