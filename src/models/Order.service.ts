import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member } from "../libs/types/member";
import { Order, OrderItemInput } from "../libs/types/order";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import { ObjectId } from "mongoose";

class OrderService {
    private readonly orderModel;
    private readonly orderItemModel;

    constructor() {
        this.orderModel = OrderModel;
        this.orderItemModel = OrderItemModel;
    }

    public async createOrder(
        member: Member,
        input: OrderItemInput[],
    ): Promise<Order> {
        // console.log("input: ", input);
        const memberId = shapeIntoMongooseObjectId(member._id);
        const amount = input.reduce((accumulator: number, item: OrderItemInput) => {
            return accumulator + item.itemPrice * item.itemQuantity;
        }, 0);

        const delivery = amount < 100 ? 5 : 0;
        console.log("amount: ", amount, "delivery: ", delivery);
        // 100 $ gacha dostavka ga +5$ to’laydi, undan ko’p bo’lsa free bo’ladi
        try {
            const newOrder: Order = await this.orderModel.create({
                orderTotal: amount + delivery,
                orderDelivery: delivery,
                memberId: memberId,
            })
            const orderId = newOrder._id;
            console.log("orderId: ", orderId); //orderId:  new ObjectId("6af4198d714c6e9a145a3219")
            // TODO: Create order items, chaqiramiz readOrderItem ni;
            await this.recordOrderItem(orderId, input);
            return newOrder;

        }
        catch (err) {
            console.log("Error, model: createOrder: ", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);


        }



    }
    private async recordOrderItem(
        orderId: ObjectId,
        input: OrderItemInput[]
    ): Promise<void> {
        const promisedList = input.map(async (item: OrderItemInput) => { // array qaytaradi shunga const list deymiz
            item.orderId = orderId;
            item.productId = shapeIntoMongooseObjectId(item.productId); // secure qilish
            await this.orderItemModel.create(item);
            return "INSERTED";
        });

        // Bular pending bo'ladi
        console.log("promisedList: ", promisedList);
        const orderItemState = await Promise.all(promisedList);
        console.log("orderItemState: ", orderItemState);

    }
}

export default OrderService;