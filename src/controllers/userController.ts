import { db } from "../database/db";
import type { User } from "../types/user";

export const creatUser = async (user: User) => {
  const result = await db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    user.name,
    user.email
  );
  return result.lastID;
};

export const getUsers = async () => {
  return await db.all<User[]>("SELECT * FROM users");
};

export const getUserById = async (id: number) => {
  return await db.get<User>("SELECT * FROM users WHERE id = ?", id);
};

export const updateUser = async (id: number, user: Partial<User>) => {
  await db.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    user.name,
    user.email,
    id
  );
};

export const deleteUser = async (id: number) => {
  await db.run("DELETE FROM users WHERE id = ?", id);
};