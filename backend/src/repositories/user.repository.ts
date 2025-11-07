import { User } from "../entities/user.model";
import { prisma } from "../config/prisma";

export class UserRepository {
  async getUsers(): Promise<User[]> {
    // prisma.user.findMany() returns items typed by Prisma Client; they match our User shape
    return prisma.user.findMany();
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    return prisma.user.create({
      data: user,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}

export const userRepository = new UserRepository();

