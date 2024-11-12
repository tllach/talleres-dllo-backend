import { Request, Response, NextFunction } from "express";
import { UserType } from "../user/v1/user.model";

export function canModifyUsers(req: Request, res: Response, next: NextFunction) {
    const requestingUser = req.user as UserType;

    if (!requestingUser) {
        return res.status(401).json({ message: "User not authenticated." });
    }

    const targetUserId = req.params.id;

    if (requestingUser._id.toString() !== targetUserId && !requestingUser.permissions.canModifyUsers) {
        return res.status(403).json({ message: "No tienes permiso para modificar este usuario." });
    }

    next();
}
