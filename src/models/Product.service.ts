import { shapeIntoMongooseObjectId } from "../libs/config";
import { ProductStatus } from "../libs/enums/product.enum";
import { ViewGroup } from "../libs/enums/view.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { Product, ProductInput, ProductInquiry, ProductUpdateInput } from "../libs/types/product";
import { ViewInput } from "../libs/types/view";
import ProductModel from "../schema/Product.model";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";


class ProductService {
    private readonly productModel;
    public viewService;
    constructor() {
        this.productModel = ProductModel;
        this.viewService = new ViewService();
    }


    /** SPA */


    /** SSR */
    public async getAllProducts(): Promise<Product[]> {

        const result = await this.productModel
            .find()
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        return result;



    }


    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            return await this.productModel.create(input);
        }
        catch (err) {
            console.error("Error, model: createNewProduct: ", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }


    public async updateChosenProduct(
        id: string,
        input: ProductUpdateInput
    ): Promise<Product> {
        // string -> ObjectId
        id = shapeIntoMongooseObjectId(id);
        const result = await this.productModel
            .findOneAndUpdate({ _id: id }, input, { new: true })
            // MongoDB'dan bitta productni topib, yangilaydigan Mongoose metodi.
            //         { _id: id } = MongoDB'dagi _id qiymati biz yuborgan idga teng bo'lgan productni topadi.
            // input = Topilgan productni Controllerdan kelgan yangi ma'lumotlar bilan yangilaydi.
            // { new: true } = Yangilangan productning yangi holatini qaytaradi.
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        return result;


    }

    public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
        console.log("inquiry: ", inquiry);
        const match: T = { productStatus: ProductStatus.PROCESS };

        if (inquiry.productCollection)
            match.productCollection = inquiry.productCollection;

        if (inquiry.search) {
            match.productName = { $regex: new RegExp(inquiry.search, "i") };
        }
        // "i" -> case-insensitive, ya'ni katta va kichik harflarni farqlamasdan qidirish
        const sort: T =
            inquiry.order === "productPrice"
                ? { [inquiry.order]: 1 }
                : { [inquiry.order]: -1 };

        const result = await this.productModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
                { $limit: inquiry.limit * 1 },
            ]
            ).exec();
        // if (result.length === 0) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);


        return result;
    }

    public async getProduct(
        memberId: ObjectId | null,
        id: string
    ): Promise<Product> {
        const productId = shapeIntoMongooseObjectId(id);

        let result = await this.productModel
            .findOne({
                _id: productId,
                productStatus: ProductStatus.PROCESS,
            })
            .exec();

        if (!result)
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        // TODO: If authenticated users => first => view log creation
        if (memberId) {
            // Check Existence
            const input: ViewInput = {
                memberId: memberId,
                viewRefId: productId,
                viewGroup: ViewGroup.PRODUCT,
            };

            const existView = await this.viewService.checkViewExistence(input);

            console.log("exist:", !!existView);

            if (!existView) {
                // Insert View
                // console.log("PLANNING TO INSERT NEW VIEW");
                await this.viewService.insertMemberView(input);

                // Increase Counts
                result = await this.productModel
                    .findByIdAndUpdate(
                        productId,
                        { $inc: { productViews: +1 } },
                        { new: true }
                    )
                    .exec();
            }
        }

        return result;
    }


}
export default ProductService;




