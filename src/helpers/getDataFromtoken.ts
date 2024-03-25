import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        //:any NOT GOOD DONT DO THIS, STUDY WHY
        const decodedToken:any = Jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message)
    }
}