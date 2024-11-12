import { UserModel, UserType } from "./user.model";
import { CreateUserType } from "./user.types";
import jwt from "jsonwebtoken";
import { env } from "process";

async function createUserAction(userData: CreateUserType): Promise<{ user: UserType; token: string }> {
    const user = await UserModel.create(userData);

    const token = jwt.sign({ id: user._id }, (env as { JWT_SECRET: string }).JWT_SECRET);
    return { user, token };
}


export default createUserAction;

