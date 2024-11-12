import { Request, Response, NextFunction } from "express";
import { UserType } from "../user/v1/user.model";

export function canModifyBooks(req: Request, res: Response, next: NextFunction) {
    const requestingUser = req.user as UserType;

    if (!requestingUser) {
        return res.status(401).json({ message: "User not authenticated." });
    }

    if (!requestingUser.permissions.canModifyBooks) {
        return res.status(403).json({ message: "No tienes permiso para modificar libros." });
    }

    next();
}
