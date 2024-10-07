import { model, Schema } from "mongoose";


interface UserType {
    id: number;
    name: string;
    hobbies: string[];
    years: number;
    team: string;
    faction: string;
}


const UserSchema = new Schema<UserType>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    hobbies: { type: [String], required: true },
    years: { type: Number, required: true },
    team: { type: String, required: true },
    faction: { type: String, required: true }
});


const UserModel = model<UserType>("User", UserSchema);

export { UserModel, UserSchema, UserType };
