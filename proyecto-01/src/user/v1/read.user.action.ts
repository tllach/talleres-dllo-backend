import { UserModel, UserType } from "./user.model";
import jwt from "jsonwebtoken";
import { env } from "process";

// DECLARE ACTION FUNCTION
async function readUserAction(includeInactive: boolean = false): Promise<UserType[]> {
  const filter = includeInactive ? {} : { isActive: true };  // Si se pide, incluye los inactivos
  const results = await UserModel.find(filter);
  return results;
}

// Buscar un usuario por email y password (para login)
async function findUserByCredentials(email: string, password: string): Promise<{ user: UserType; token: string } | null> {
  const user = await UserModel.findOne({ email, password, isActive: true });
  
  if (!user) return null;

  // Generar el token JWT usando el valor de env
  const token = jwt.sign({ id: user._id }, (env as { JWT_SECRET: string }).JWT_SECRET);

  return { user, token };
}

// Obtener las reservas de un usuario desde la base de datos
async function getUserReservationsAction(userId: string): Promise<UserType["reservations"]> {
  const user = await UserModel.findById(userId).select("reservations");
  if (!user) {
      throw new Error("Usuario no encontrado");
  }
  return user.reservations;
}

// EXPORT ACTION FUNCTION
export { readUserAction, findUserByCredentials, getUserReservationsAction };
