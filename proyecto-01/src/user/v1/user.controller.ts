import createUserAction from "./create.user.action";
import { readUserAction, findUserByCredentials, getUserReservationsAction } from "./read.user.action";
import { updateUserAction } from "./update.user.action";
import  deleteUserAction  from "./delete.user.action";
import { UserModel, UserType } from "./user.model";
import { CreateUserType, UpdateUserType } from "./user.types";


// DECLARE CONTROLLER FUNCTIONS
async function readUsers(includeInactive: boolean = false): Promise<UserType[]> {
  return await readUserAction(includeInactive);
}

async function createUser(userData: CreateUserType): Promise<{ user: UserType; token: string }> {
  return await createUserAction(userData);
}

async function loginUser(email: string, password: string) {
  return await findUserByCredentials(email, password);
}

async function updateUser(userId: string, updateData: UpdateUserType): Promise<UserType | null> {
  // Verificar si el usuario que se va a actualizar está activo
  const userToBeUpdated = await UserModel.findById(userId);
  if (!userToBeUpdated || !userToBeUpdated.isActive) {
      throw new Error("El usuario está inhabilitado.");
  }
  return await updateUserAction(userId, updateData);
}

async function deleteUser(userId: string): Promise<UserType | null> {
  const userToBeUpdated = await UserModel.findById(userId);
  if (!userToBeUpdated || !userToBeUpdated.isActive) {
      throw new Error("El usuario ya está inhabilitado.");
  }

  return await deleteUserAction(userId);
}

async function getUserReservations(userId: string): Promise<UserType["reservations"]> {
  return await getUserReservationsAction(userId);
}
// EXPORT CONTROLLER FUNCTIONS
export { readUsers, createUser, loginUser, updateUser, deleteUser, getUserReservations };
