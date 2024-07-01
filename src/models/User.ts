import { PrismaClient } from "@prisma/client";
import { query } from "../db";
import bcrypt from "bcrypt";
// import { UUIDV4 } from "sequelize";
import { v4 as uuidv4, v4 } from "uuid";

const prisma = new PrismaClient();

interface User {
  id: number;
  name: string;
  email: string;
  wallet: string;
  contact_details: string | any;
  password: string;
  img: string;
  address: string;
  country: string;
  created_at: string;
  role: string;
}

export const readUser = async (id: number) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

export const emailChecker = async (email: string | any) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

export const readUserByWallet = async (wallet: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          {
            wallet,
          },
        ],
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

export const updateUserImage = async (id: number, updates: Partial<User>) => {
  try {
    const { img } = updates;

    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        img,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (id: number, updates: Partial<User>) => {
  try {
    const {
      name,
      email,
      wallet,
      contact_details,
      img,
      address,
      country,
      role,
    } = updates;

    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        wallet,
        contact_details,
        img,
        address,
        country,
        role,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await prisma.users.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    // console.log(users);
    return users;
  } catch (err) {
    throw err;
  }
};

export const signupUser = async (user: {
  name: string;
  email: string;
  wallet: string;
  contact_details: string | any;
  password: string;
  img: string;
  address: string;
  country: string;
  role: string;
}) => {
  try {
    const {
      name,
      email,
      wallet,
      contact_details,
      password,
      img,
      address,
      country,
      role,
    } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const created_at = new Date().toISOString();

    const existingUser = await prisma.users.findFirst({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });
    console.log(existingUser);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const newUser = await prisma.users.create({
      // @ts-ignore
      data: {
        name,
        email: email.toLowerCase(),
        wallet,
        contact_details,
        password: hashedPassword.toString(),
        img,
        address,
        role,
        country,
        // @ts-ignore
        created_at,
      },
    });
    return newUser;
  } catch (err) {
    throw err;
  }
};
export const signinUser = async (email: string, password: string) => {
  try {
    const player = await prisma.users.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (player && (await bcrypt.compare(password, player.password))) {
      return player;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const updateUserPassword = async (
  email: string,
  newPassword: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await prisma.users.update({
      where: {
        email: email.toLowerCase(),
      },
      data: {
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
