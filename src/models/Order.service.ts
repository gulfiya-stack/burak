import { shapeIntoMongooseObjectId } from "../libs/config";
import { OrderStatus } from "../libs/enums/order.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member } from "../libs/types/member";
import { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../libs/types/order";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import { ObjectId } from "mongoose";
import MemberService from "./Member.service";

class OrderService {
    private readonly orderModel;
    private readonly orderItemModel;
    private readonly memberService;

    constructor() {
        this.orderModel = OrderModel;
        this.orderItemModel = OrderItemModel;
        this.memberService = new MemberService();
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

    public async getMyOrders(
        member: Member,
        inquiry: OrderInquiry
    ): Promise<Order[]> {
        const memberId = shapeIntoMongooseObjectId(member._id);
        const matches = { memberId: memberId, orderStatus: inquiry.orderStatus };

        const result = await this.orderModel.aggregate([
            { $match: matches },
            { $sort: { updatedAt: -1 } },
            { $skip: (inquiry.page - 1) * inquiry.limit },
            { $limit: inquiry.limit },
            {
                $lookup: {
                    from: "orderItems",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "orderItems"

                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "orderItems.productId",
                    foreignField: "_id",
                    as: "productData"
                }
            }
        ]).exec();

        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        return result;
    }

    public async updateOrder(member: Member, input: OrderUpdateInput): Promise<Order> {
        const memberId = shapeIntoMongooseObjectId(member._id),
            orderId = shapeIntoMongooseObjectId(input.orderId),
            orderStatus = input.orderStatus;
        const result = await this.orderModel.findOneAndUpdate({
            memberId: memberId,
            _id: orderId
        },
            { orderStatus: orderStatus },
            { new: true }
        ).exec();

        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        if (orderStatus === OrderStatus.PROCESS) {
            await this.memberService.addUserPoint(member, 1);
        }

        return result;

    }
}

export default OrderService;