import { Cart } from "./cart.model";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  cart?: Cart;
}

export interface SessionUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}