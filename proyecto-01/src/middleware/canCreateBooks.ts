import { Request, Response, NextFunction } from "express";
import { UserType } from "../user/v1/user.model";

export function canCreateBooks(req: Request, res: Response, next: NextFunction) {
    const requestingUser = req.user as UserType;

    if (!requestingUser) {
        return res.status(401).json({ message: "User not authenticated." });
    }

    // Verificar si el usuario tiene permiso para crear libros
    if (!requestingUser.permissions.canCreateBooks) {
        return res.status(403).json({ message: "No tienes permiso para crear libros." });
    }

    next();
}
