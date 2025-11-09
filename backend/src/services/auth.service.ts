import bcrypt from "bcryptjs";
import { User } from "../entities/user.model";
import { userRepository } from "../repositories/user.repository";

export class AuthService {
  async registerUser(user: Omit<User, "id">): Promise<User | null> {
    if (!this.validateUser(user)) {
      throw new Error("Invalid user data");
    }

    const existingUser = await userRepository.findByEmail(user.email);
    if (existingUser) {
      return null;
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10);

    return await userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    return user;
  }

  private validateUser(user: Omit<User, "id">): boolean {
    const { firstName, lastName, email, password, address } = user;

    if (!firstName || !lastName || !email || !password || !address) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }

    return true;
  }
}

export const authService = new AuthService();

