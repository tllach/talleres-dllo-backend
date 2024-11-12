import { Router, Request, Response } from "express";
import { createUser, readUsers, loginUser, updateUser, deleteUser, getUserReservations } from "./user.controller";
import { CreateUserType, UpdateUserType } from "./user.types";
import { AuthMiddleware } from "../../middleware/auth";
import { canModifyUsers } from "../../middleware/canModifyUsers";
import { canDisableUsers } from "../../middleware/canDisableUsers";

// INIT ROUTES
const userRoutes = Router();

// Validar el formato de correo
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// DECLARE ENDPOINT FUNCTIONS
async function GetUsers(request: Request, response: Response) {
    const includeInactive = request.query.includeInactive === 'true';

    try {
        const users = await readUsers(includeInactive);
        response.status(200).json({
            message: "Usuarios obtenidos exitosamente",
            users: users,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error al obtener los usuarios",
            error: (error as Error).message,
        });
    }
}

async function CreateUser(request: Request, response: Response) {
    // Campos requeridos
    const { name, cedula, email, password } = request.body;
    if (!name || !cedula || !email || !password) {
        return response.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    if (!isValidEmail(email)) {
        return response.status(400).json({ message: "El formato del correo es inválido." });
    }

    try {
        const {user, token} = await createUser(request.body as CreateUserType);
        response.status(201).json({
            message: "Usuario creado exitosamente",
            user,
            token,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error al crear el usuario",
            error: (error as Error).message,
        });
    }
}

async function LoginUser(request: Request, response: Response) {
  const { email, password } = request.body;
  if (!email || !password) {
      return response.status(400).json({ message: "Email y contraseña son obligatorios." });
  }

  if (!isValidEmail(email)) {
      return response.status(400).json({ message: "El formato del correo es inválido." });
  }

  try {
      const user = await loginUser(email, password);
      if (user) {
          response.status(200).json({
              message: "Inicio de sesión exitoso",
              user,
          });
      } else {
          response.status(401).json({ message: "Credenciales incorrectas." });
      }
  } catch (error) {
      response.status(500).json({
          message: "Error en el inicio de sesión",
          error: (error as Error).message,
      });
  }
}

async function UpdateUser(request: Request, response: Response) {
    const userId = request.params.id;
    const updateData = request.body;

    try {
        const updatedUser = await updateUser(userId, updateData);
        response.status(200).json({
            message: "Usuario actualizado exitosamente",
            user: updatedUser,
        });
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }

}

async function DeleteUser(request: Request, response: Response) {
    const userId = request.params.id;

    try {
        const deletedUser = await deleteUser(userId);
        response.status(200).json({
            message: "Usuario inhabilitado exitosamente",
            user: deletedUser,
        });
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }
}

async function GetUserReservations(request: Request, response: Response) {
    const requestingUser = request.user;

    if (!requestingUser) {
        return response.status(401).json({ message: "User not authenticated." });
    }

    try {
        const reservations = await getUserReservations(requestingUser._id);
        response.status(200).json({
            message: "Reservas obtenidas exitosamente",
            reservations: reservations,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error al obtener las reservas del usuario",
            error: (error as Error).message,
        });
    }
}


// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.get("/reservations", AuthMiddleware, GetUserReservations);
userRoutes.post("/", CreateUser);
userRoutes.post("/login", LoginUser);
userRoutes.put("/:id", AuthMiddleware, canModifyUsers, UpdateUser);
userRoutes.delete("/:id", AuthMiddleware, canDisableUsers, DeleteUser);

// EXPORT ROUTES
export default userRoutes;
