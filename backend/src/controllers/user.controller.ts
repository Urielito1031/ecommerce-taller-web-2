import {Request, Response} from 'express';
import { User } from "../entities/user.model";
import { userService } from "../services/user.service";


export const getUsers = async(req: Request, res: Response):Promise<void> => {
 // res.header("Access-Control-Allow-Origin", "*");
   const users: User[] | null = await userService.getUsers();
   res.json(users);
};