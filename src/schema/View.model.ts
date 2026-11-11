import mongoose, { Schema } from "mongoose";
import { ViewGroup } from "../libs/enums/view.enum";

const viewSchema = new Schema(
    {
        viewGroup: {
            type: String,
            enum: ViewGroup,
            required: true,
        },

        memberId: {
            type: Schema.Types.ObjectId, //memberId
            required: true,
            ref: "Member", //reference to Member Schema 
        },

        viewRefId: {
            type: Schema.Types.ObjectId, //productId
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("View", viewSchema);