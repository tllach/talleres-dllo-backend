import { UserModel, UserType } from "./user.model";

async function updateUserAction(userId: string, updateData: Partial<UserType>): Promise<UserType | null> {
    return await UserModel.findByIdAndUpdate(userId,  updateData, { new: true });
}
export { updateUserAction };
