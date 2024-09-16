import jwt from "jsonwebtoken";
import { IUserProdiver } from "../interfaces/IUserProvider";
export function generateToken(user:Partial<IUserProdiver>):string | null | undefined{
    return jwt.sign(user,"SECRET", {expiresIn: "1h"});
}