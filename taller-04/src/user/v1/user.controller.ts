import { 
  readUsersByHobby, 
  checkUserExists, 
  getTotalExperienceByTeam, 
  getUsersByFaction } from "./read.user.action";

import { createUserAction } from "./create.user.action";
import { UserType } from "./user.model";


async function getUsersByHobby(hobby: string): Promise<UserType[]> {
  return await readUsersByHobby(hobby);
}


async function userExists(userId: number): Promise<boolean> {
  return await checkUserExists(userId);
}


async function totalExperienceByTeam(team: string): Promise<number> {
  return await getTotalExperienceByTeam(team);
}

async function usersByFaction(faction: string): Promise<UserType[]> {
  return await getUsersByFaction(faction);
}


async function createUser(userData: UserType): Promise<UserType> {
  return await createUserAction(userData);
}


export { 
  getUsersByHobby, 
  userExists, 
  totalExperienceByTeam,
  usersByFaction,
  createUser };
