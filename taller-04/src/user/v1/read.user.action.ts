import { UserModel, UserType } from "./user.model";


async function readUserAction(): Promise<UserType[]> {
  return await UserModel.find();
}


async function readUsersByHobby(hobby: string): Promise<UserType[]> {
  return await UserModel.find({ hobbies: hobby });
}


async function checkUserExists(userId: number): Promise<boolean> {
  const user = await UserModel.findOne({ id: userId });
  return user !== null;
}

async function getTotalExperienceByTeam(team: string): Promise<number> {
  const users = await UserModel.find({ team });
  return users.reduce((sum, user) => sum + user.years, 0);
}


async function getUsersByFaction(faction: string): Promise<UserType[]> {
  return await UserModel.find({ faction });
}


export { 
  readUserAction, 
  readUsersByHobby, 
  checkUserExists, 
  getTotalExperienceByTeam,
  getUsersByFaction };
