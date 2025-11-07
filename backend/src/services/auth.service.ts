import { User } from "../entities/user.model";
import { userRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";

export class AuthService {
  private async existsByEmail(email: string): Promise<boolean> {
    const userExists = await userRepository.findByEmail(email);
    return userExists !== null;
  }

  private async validateUser(user: Omit<User, "id">): Promise<boolean> {
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

  async registerUser(user: Omit<User, "id">): Promise<User | null> {
    if (!(await this.validateUser(user))) {
      throw new Error("Invalid user data");
    }

    if (await this.existsByEmail(user.email)) {
      return null;
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const userToSave = { ...user, password: hashedPassword };

    return userRepository.createUser(userToSave);
  }

  async login(email: string, password: string): Promise<User | null> {
    if (!await this.existsByEmail(email)) {
      return null;
    }

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
}

export const authService = new AuthService();

