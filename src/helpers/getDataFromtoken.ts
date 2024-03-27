import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";


interface DecodedTokenPayload {
    id: string;
    username: string;
    email: string;
    iat: number; // Issued At
    exp: number; // Expiration Time
}


export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = Jwt.verify(token, process.env.TOKEN_SECRET!);
        //Jwt could return object payload or string if invalid, need to check that
        if(typeof decodedToken === 'object' && decodedToken !== null && 'id' in decodedToken){
            return(decodedToken as DecodedTokenPayload).id;
        }else {
            // Handle the case where decodedToken is not of type DecodedTokenPayload
            // This could be due to an invalid token or a mismatched secret
            throw new Error("Invalid token.");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Now TypeScript knows that error is an instance of Error,
            // so you can safely access the message property.
            throw new Error(error.message);
        } else {
            // Handle the case where error is not an instance of Error.
            // This might be a good place to log the error or throw a new, more generic error.
            throw new Error("An unexpected error occurred.");
        }
    }
}