import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../user/v1/user.model";

export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    if (!request.headers.authorization) {
        return response.status(401).json({
            message: "Not authorized."
        });
    }

    const token = request.headers.authorization.split(" ")[1];

    try {
        // Verificar el token con `jwt.verify` y la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        // Buscar el usuario en la base de datos usando el ID del token decodificado
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return response.status(401).json({
                message: "User not found."
            });
        }

        // Asignar el usuario autenticado a request.user
        request.user = user;
        next();
    } catch (error) {
        return response.status(401).json({
            message: "Invalid token.",
            error: (error as Error).message
        });
    }
}
