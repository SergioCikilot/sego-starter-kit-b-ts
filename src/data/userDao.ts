import { UserType } from 'userType';

import { PrismaClient } from '@prisma/client';
import { HookCallbacks } from 'async_hooks';

const prisma = new PrismaClient();

async function createUser(data: UserType) {
  const user = await prisma.user.create({
    data: data,
  });

  return console.log(`User with usernamee ${data.username} added`);
}

async function findAllUsers() {
  const user = await prisma.user.findMany({});
  return user;
}

async function findUserByUserName(data: UserType) {
  const user: any = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (!user) {
    let message = { message: 'Email or password invaldi' };
    return message;
  }

  return user;
}

export = { createUser, findAllUsers, findUserByUserName };
