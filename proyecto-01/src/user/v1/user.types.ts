import { UserType } from "./user.model";

export type CreateUserType = Omit<UserType, "_id">;
export type UpdateUserType = Omit<Partial<UserType>, "_id">;
export type RequestingUserType = {
    _id: string;
    name: string;
    permissions: {
        canCreateBooks: boolean;
        canModifyUsers: boolean;
        canModifyBooks: boolean;
        canDisableUsers: boolean;
        canDisableBooks: boolean;
    };
};

declare global {
    namespace Express {
        interface Request {
            user?: UserType;
        }
    }
}
