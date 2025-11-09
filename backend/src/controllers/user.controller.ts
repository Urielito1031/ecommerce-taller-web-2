import { Request, Response } from "express";
import { userService } from "../services/user.service";

export class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    const users = await userService.getUsers();
    res.json(users);
  }
}

export const userController = new UserController();