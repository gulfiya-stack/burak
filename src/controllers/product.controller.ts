import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import ProductService from "../models/Product.service";
import { ProductInput } from "../libs/types/product";
import { AdminRequest } from "../libs/types/member";

const productController: T = {};
const productService = new ProductService();


/** SPA */


/** SSR */

productController.getAllProducts = async (req: Request, res: Response) => {

    try {
        console.log('getAllProducts');
        const data = await productService.getAllProducts();
        console.log("data: ", data);
        res.render("products", { products: data });


    } catch (err) {
        console.log("Error, getAllProducts: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard.code);
    }

};


productController.createNewProduct = async (req: AdminRequest, res: Response) => {

    try {
        console.log('createNewProduct');
        console.log("req.files: ", req.files);
        if (!req.files?.length) throw new Errors(HttpCode.INTERNAL_SERVER_ERROR,
            Message.CREATE_FAILED);
        const data: ProductInput = req.body;
        data.productImages = req.files?.map((ele) => { //adding new property to data object
            return ele.path.replace(/\\/g, "/"); //replace backslash with forward slash for windows
        });

        console.log("data: ", data);
        await productService.createNewProduct(data);
        res.send(`<script>alert("Successful creation"); window.location.replace("admin/product/all")</script>`);

    } catch (err) {
        console.log("Error, createNewProduct: ", err);
        const message =
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(`<script>alert("${message}"); window.location.replace("admin/product/all")</script>`);

    }

};

productController.updateChosenProduct = async (req: Request, res: Response) => {

    try {
        console.log('updateChosenProduct');
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        console.log("id", id);  // req.params - id+id2

        const result = await productService.updateChosenProduct(id, req.body);

        res.status(HttpCode.OK).json({ data: result });


    } catch (err) {
        console.log("Error, updateChosenProduct: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard.code);
    }

};





export default productController;