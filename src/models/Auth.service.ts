import { AUTH_TIMER } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";

class AuthService {
    private readonly secretToken;

    constructor() {
        this.secretToken = process.env.SESSION_TOKEN as string;
    }

    public async createToken(payload: Member) {
        return new Promise((resolve, reject) => {
            const duration = `${AUTH_TIMER}h`;
            jwt.sign(payload, this.secretToken as string, { expiresIn: duration }, (err, token) => {
                if (err)
                    reject(new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED));
                else resolve(token as string);
            });

        }
        );
    }

    public async checkAuth(token: string): Promise<Member> {

        try {
            const result = (await jwt.verify(
                token,
                this.secretToken
            )) as Member;
            console.log(`--- [AUTH] memberNick: ${result.memberNick} ---`);

            return result;

        }

        catch {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

        }


    }
}
// Mavjud bolgan TOKEN ichidan member malumotlarini decode (chiqarib berish--> token into {object}) qilish uchun.



export default AuthService;

// payload: qaysi member malumotni token qilmoqchi ekanligimizni bildiradi. payload ichida memberning id, nick, type va statusi bo'lishi mumkin. Bu ma'lumotlar token ichida saqlanadi va keyinchalik tekshirish uchun ishlatiladi.
