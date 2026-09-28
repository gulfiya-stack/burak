import { Request, Response } from "express";
import { T } from "../libs/types/common"; // {T, test}
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        //try - catch maydoni
        //LOGIC
        //SERVICE
        //...
        res.send("Home Page");
        //send | json | redirect | end | render
    } catch (err) {
        console.log("Error, goHome: ", err);
    }

};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.send("Login Page");
    } catch (err) {
        console.log("Error, getLogin: ", err);
    }

};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log('getSignup');
        res.send("Signup Page");
    } catch (err) {
        console.log("Error, getSignup: ", err);
    }

};
restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log('processLogin');
        console.log(req.body);
        const input: LoginInput = req.body;

        const memberService = new MemberService();
        const result = await memberService.processLogin(input);

        res.send(result);
    } catch (err) {
        console.log("Error, processLogin: ", err);
        res.send(err);
    }

};

restaurantController.processSignup = async (req: Request, res: Response) => {
    // restaurantController.processSignup = (req: Request, res: Response) => {
    try {
        console.log('processSignup');
        // console.log('body:', req.body);
        //Service module start usage

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;

        const memberService = new MemberService();
        // await memberService.processSignup();
        const result = await memberService.processSignup(newMember);
        // memberService.processSignup();
        res.send(result);
    } catch (err) {
        console.log("Error, processSignup: ", err);
        res.send(err);
    }

};

export default restaurantController;