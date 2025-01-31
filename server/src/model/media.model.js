import { model, Schema } from "mongoose";

const mediaSchema = new Schema(
    {
        images: { type: [String], default: [] },
    },
    {
        timestamps: true,
        collection: "media",
        versionKey: false
    }
)

const mediaModel = model("media", mediaSchema)

export default mediaModel