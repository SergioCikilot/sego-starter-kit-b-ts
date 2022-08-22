import { UserType } from 'userType';

require('dotenv').config();

import bcrptHasher from '../security/bcryptHasher';
import userDao from '../data/userDao';
import authentication from '../security/auth/authentication';

const dateFinder = new Date();

const dateNow = () => {
  let day = dateFinder.getDate();
  let month = dateFinder.getMonth() + 1;
  let year = dateFinder.getFullYear();

  return `${year}-${month}-${day}`;
};

async function addUser(data: UserType) {
  let hashedPassword = bcrptHasher.hash(data.password);
  data.password = hashedPassword;
  data['date'] = dateNow();
  const message = await userDao.createUser(data);
  return message;
}

async function findAllUsers() {
  const users = await userDao.findAllUsers();
  return users;
}

async function findUserByUserName(data: UserType) {
  const user = await userDao.findUserByUserName(data);
  return user;
}

async function loginManager(data: UserType) {
  let isAuthenticated = false;
  const user = await userDao.findUserByUserName(data);

  if (!user) {
    return user;
  }

  var token = authentication.signToken(user, '1h');

  return 'Bearer ' + token;
}

export = { addUser, findAllUsers, findUserByUserName, loginManager };
