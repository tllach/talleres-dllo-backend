import { model, Schema, Types } from "mongoose";

type UserType = {
    _id: string;
    name: string;
    cedula: string;
    email: string;
    password: string;
    permissions: {
        canCreateBooks: boolean;
        canModifyUsers: boolean;
        canModifyBooks: boolean;
        canDisableUsers: boolean;
        canDisableBooks: boolean;
    };
    reservations: Array<{
        bookId: Types.ObjectId;
        reservationDate: Date;
        returnDate: Date;
    }>;
    isActive: boolean;
};

const UserSchema = new Schema<UserType>({
    name: { type: String, required: true },
    cedula: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permissions: {
        canCreateBooks: { type: Boolean, default: false },
        canModifyUsers: { type: Boolean, default: false },
        canModifyBooks: { type: Boolean, default: false },
        canDisableUsers: { type: Boolean, default: false },
        canDisableBooks: { type: Boolean, default: false }
    },
    reservations: [
        {
            bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
            reservationDate: { type: Date, required: true },
            returnDate: { type: Date, required: true }
        }
    ],
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});

const UserModel = model<UserType>("User", UserSchema);

export { UserModel, UserSchema, UserType };
