import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../models/User";
import { Equal } from "typeorm";

const userRepository = AppDataSource.getRepository(User);
const userErrors = require("../errors/userErrors");

export const displayUser = async (req: Request, res: Response) => {
  try {
    const userID = parseInt(req.params.userID);
    const user = await userRepository.findOneBy({
      id: Equal(userID),
    });
    for (const error in userErrors) {
      if (userErrors[error](user)) {
        switch (error) {
          case "isValidUser":
            return res.status(404).json({ error: "User not found" });
        }
      }
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to display user details" });
  }
};

export const newPassword = async (req: Request, res: Response) => {
  try {
    const userID = parseInt(req.params.userID);
    const user = await userRepository.findOneBy({
      id: userID,
    });
    for (const error in userErrors) {
      if (userErrors[error](user)) {
        switch (error) {
          case "isValidUser":
            return res.status(404).json({ error: "User not found" });
        }
      }
    }
    user!.password = req.body.password;
    await userRepository.save(user!);
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to update password" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userID = parseInt(req.params.userID);
    const user = await userRepository.findOneBy({
      id: Equal(userID),
    });
    for (const error in userErrors) {
      if (userErrors[error](user)) {
        switch (error) {
          case "isValidUser":
            return res.status(404).json({ error: "User not found" });
        }
      }
    }
    await userRepository.remove(user!);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
};
