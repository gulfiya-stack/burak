import { AUTH_TIMER } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";

class AuthService {
    constructor() { }

    public async createToken(payload: Member) {
        return new Promise((resolve, reject) => {
            const duration = `${AUTH_TIMER}h`;
            jwt.sign(payload, process.env.SESSION_TOKEN as string, { expiresIn: duration }, (err, token) => {
                if (err)
                    reject(new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED));
                else resolve(token as string);
            });

        }
        );
    }

}

export default AuthService;

// payload: qaysi member malumotni token qilmoqchi ekanligimizni bildiradi. payload ichida memberning id, nick, type va statusi bo'lishi mumkin. Bu ma'lumotlar token ichida saqlanadi va keyinchalik tekshirish uchun ishlatiladi.
