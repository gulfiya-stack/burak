import mongoose, { Schema } from "mongoose";
import { ProductCollection, ProductSize, ProductStatus, ProductVolume } from "../libs/enums/product.enum";

const productSchema = new Schema({
    productStatus: {
        type: String,
        enum: ProductStatus,
        default: ProductStatus.PAUSE,
    },

    productCollection: {
        type: String,
        enum: ProductCollection,
        required: true,
    },

    productName: {
        type: String,
        required: true,
    },

    productPrice: {
        type: Number,
        required: true,
    },

    productLeftCount: {
        type: Number,
        required: true,
    },

    productSize: {
        type: String,
        enum: ProductSize,
        default: ProductSize.NORMAL,
    },

    productVolume: {
        type: String,
        enum: ProductVolume,
        default: ProductVolume.ONE,
    },

    productDesc: {
        type: String,
        required: true,
    },

    productImages: {
        type: [String],
        required: [],
    },

    producViews: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true } // updatedAt, createdAt
);

productSchema.index({ productName: 1, productSize: 1, productVolume: 1 }, { unique: true });
export default mongoose.model('Product', productSchema);



// 4 xil validation: 
/**
 Frontend validation: user input validation
 Pipe validation: server side validation (between frontend and backend)
 Backend validation: server side validation
 Database validation: database schema validation
 
 BUT we use only:
frontend, backend, database validation

 */