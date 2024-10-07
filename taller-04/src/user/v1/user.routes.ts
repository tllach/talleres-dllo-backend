import { Router, Request, Response } from "express";
import {
  getUsersByHobby, 
  userExists, 
  totalExperienceByTeam,
  usersByFaction,
  createUser } from "./user.controller";

import { UserType } from "./user.model";

const userRoutes = Router();


async function GetUsersByHobby(request: Request, response: Response) {
  const { hobby } = request.query;

  if (!hobby) {
    return response.status(400).json({
      message: "Hobby is required",
    });
  }

  const users = await getUsersByHobby(hobby as string);
  
  if (users.length === 0) {
    return response.status(404).json({
      message: `No users found with the hobby: ${hobby}`,
    });
  }

  response.status(200).json({
    message: "Success",
    users: users,
  });
}


async function CheckUserExists(request: Request, response: Response) {
  const userId = parseInt(request.params.id, 10);
  const exists = await userExists(userId);
  response.status(200).json({
    message: "Success",
    exists: exists,
  });
}


async function GetTotalExperienceByTeam(request: Request, response: Response) {
  const { team } = request.query;

  if (!team) {
    return response.status(400).json({
      message: "Team is required",
    });
  }

  const totalExperience = await totalExperienceByTeam(team as string);
  
  response.status(200).json({
    message: "Success",
    totalExperience: totalExperience,
  });
}


async function GetUsersByFaction(request: Request, response: Response) {
  const { faction } = request.query;

  if (!faction) {
    return response.status(400).json({
      message: "Faction is required",
    });
  }

  const users = await usersByFaction(faction as string);
  
  if (users.length === 0) {
    return response.status(404).json({
      message: `No users found in the faction: ${faction}`,
    });
  }

  response.status(200).json({
    message: "Success",
    users: users,
  });
}

async function RegisterUser(request: Request, response: Response) {
  const userData: UserType = request.body;

  if (!userData || !userData.id || !userData.name || !userData.hobbies || !userData.years || !userData.team || !userData.faction) {
    return response.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const newUser = await createUser(userData);
    response.status(201).json({
      message: "User created successfully",
      user: newUser,
    });

  } catch (error) {
    const err = error as Error;
    response.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
}

//PUNTO 1
userRoutes.get("/hobby", GetUsersByHobby);
//PUNTO 2
userRoutes.get("/exists/:id", CheckUserExists);
//PUNTO 3
userRoutes.get("/team-experience", GetTotalExperienceByTeam);
//PUNTO 4
userRoutes.get("/by-faction", GetUsersByFaction);
//PUNTO 5
userRoutes.post("/", RegisterUser);


export default userRoutes;
