import { UserModel, UserType } from "./user.model";

async function createUserAction(userData: UserType): Promise<UserType> {
    const newUser = new UserModel(userData);
    await newUser.save();
    return newUser;
  }


export { createUserAction };
