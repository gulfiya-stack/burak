import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common"; // {T, test}
import { MemberType } from "../libs/enums/member.enum";
import { ExtendedRequest, LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";
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
        res.cookie(
            "accessToken",
            token,
            {
                maxAge: AUTH_TIMER * 3600 * 1000,
                httpOnly: false
            }
        );
        res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
        console.log('token=====> ', token);
    } catch (err) {
        console.log("Error, Signup: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }

};


memberController.login = async (req: Request, res: Response) => {
    try {
        console.log('login');
        console.log("req.body => ", req.body);
        const input: LoginInput = req.body,
            result = await memberService.login(input);
        console.log('login result: ', result);
        // TODO: TOKEN AUTHENTICATION
        const token = await authService.createToken(result);
        // member info => to token payload
        console.log('token=> ', token);

        // Token ni cookie ga COOKIE PARSER orqali saqlash 
        res.cookie(
            "accessToken",
            token,
            {
                maxAge: AUTH_TIMER * 3600 * 1000,
                httpOnly: false
            }
        );
        res.status(HttpCode.OK).json({ memberRES: result, accessTokenIS: token });
    } catch (err) {
        console.log("Error, login: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard.code);
    }

};

memberController.getMemberDetail = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("getMemberDetail");
        const result = await memberService.getMemberDetail(req.member);
        res.status(HttpCode.OK).json(result);

    }
    catch (err) {
        console.log("Error, getMemberDetail: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }

};

memberController.updateMember = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("updateMember");
        const input = req.body;
        if (req.file) input.memberImage = req.file.path.replace(/\\/, "/");
        const result = await memberService.updateMember(req.member, input);

        res.status(HttpCode.OK).json(result);


    }
    catch (err) {
        console.log("Error, updateMember: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);


    }
}

memberController.logout = (req: ExtendedRequest, res: Response) => {
    try {
        console.log("logout");
        res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
        res.status(HttpCode.OK).json({ logout: true });
    }
    catch (err) {
        console.log("Error, logout: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }

}

memberController.getTopUsers = async (req: Request, res: Response) => {
    try {
        console.log("getTopUsers");
        const result = await memberService.getTopUsers();
        res.status(HttpCode.OK).json(result);

    }

    catch (err) {
        console.log("Error, getTopUsers: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

memberController.getRestaurant = async (req: Request, res: Response) => {
    try {
        console.log("getRestaurant");
        const result = await memberService.getRestaurant();
        res.status(HttpCode.OK).json(result);
    }
    catch (err) {
        console.log("Error, getRestaurant: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

memberController.verifyAuth = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies["accessToken"];
        console.log("token received:", token); //added for debugging

        if (token) req.member = await authService.checkAuth(token);

        if (!req.member) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);
        }
        next();
    }
    catch (err) {
        console.log("Error, verifyAuth: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};


memberController.retrieveAuth = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        let member = null;
        const token = req.cookies["accessToken"];
        if (token) req.member = await authService.checkAuth(token);
        next();
    }
    catch (err) {
        console.log("Error, retrieveAuth: ", err);
        next();
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