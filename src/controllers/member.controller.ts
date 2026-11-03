import { Request, Response } from "express";
import { T } from "../libs/types/common"; // {T, test}
import { MemberType } from "../libs/enums/member.enum";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors from "../libs/Errors";
import AuthService from "../models/Auth.service";
const memberController: T = {};
const memberService = new MemberService();
const authService = new AuthService();
//REACT




memberController.signup = async (req: Request, res: Response) => {

    try {
        console.log('signup');

        const input: MemberInput = req.body,
            result: Member = await memberService.signup(input);
        const token = await authService.createToken(result);
        // TODO: TOKEN AUTHENTICATION 
        console.log('token=====> ', token);
        res.json({ member: result });
    } catch (err) {
        console.log("Error, Signup: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard.code);
    }

};


memberController.login = async (req: Request, res: Response) => {
    try {
        console.log('login');
        console.log(req.body);
        const input: LoginInput = req.body,
            result = await memberService.login(input);
        console.log('login result: ', result);
        // TODO: TOKEN AUTHENTICATION
        const token = await authService.createToken(result);
        console.log('token=> ', token);

        res.json({ member: result });
    } catch (err) {
        console.log("Error, processLogin: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard.code);
    }

};

export default memberController;







// memberController.goHome = (req: Request, res: Response) => {
//     try {
//         res.send("Home Page");
//     } catch (err) {
//         console.log("Error, goHome: ", err);
//     }

// };

// memberController.getLogin = (req: Request, res: Response) => {
//     try {
//         res.send("Login Page");
//     } catch (err) {
//         console.log("Error, getLogin: ", err);
//     }

// };

// memberController.getSignup = (req: Request, res: Response) => {
//     try {
//         res.send("Signup Page");
//     } catch (err) {
//         console.log("Error, getSignup: ", err);
//     }

// };