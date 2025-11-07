import { User } from "../entities/user.model";
import { userRepository } from "../repositories/user.repository";

export class UserService {
    async getUsers(): Promise<User[]> {
        return userRepository.getUsers();
    }

    async findByEmail(email: string): Promise<User | null> {
        return userRepository.findByEmail(email);
    }
}

export const userService = new UserService();
