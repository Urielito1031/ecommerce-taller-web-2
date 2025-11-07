import {Request, Response} from 'express';
import { authService } from "../services/auth.service";
import { User } from '../entities/user.model';




export const register = async (req: Request, res: Response): Promise<void> => {
    const user: Omit<User, "id"> = req.body;

    const newUser = await authService.registerUser(user);
    if (!newUser) {
        res.status(400).json({ message: "El email ya está registrado" });
        return;
    }
    res.status(201).json(newUser);
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    if (!user) {
        res.status(400).json({ message: "Credenciales invalidas" });
        return;
    }
    res.json(user);
}