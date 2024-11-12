import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION
async function deleteUserAction(userId: string): Promise<UserType | null> {
    return await UserModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });
}

// EXPORT ACTION FUNCTION
export default deleteUserAction;
