import bcrypt from 'bcrypt';
import validator from 'validator';
import _ from 'lodash';
import {getRepository} from 'typeorm';

import Users from '../entity/User';

// create a new user and save into db
const register = async (data: {
  username: string;
  email: string;
  password: string;
  date: Date;
}): Promise<any> => {
  const { username, email } = data;
  let { password } = data;
  let date = new Date;

  if (!validator.isEmail(email)) throw new Error('invalid email');

  password = await bcrypt.hash(password, 10);

  const newUser = getRepository(Users).create({
    username,
    email,
    password,
    date
  });

  const result = await getRepository(Users).save(newUser);

  // const user = await Users.create({
  //   username,
  //   email,
  //   password
  // });
  return _.omit(result, 'password', '__v');
};

// login user and creates a jwt token
const login = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  const { email, password } = data;

  const user = await getRepository(Users).findOne({where:{email:email}});
  // const user = await Users.findOne({ email });

  if (!user)
    throw {
      code: 404,
      message: `The user with the email ${email} was not found`
    };
  

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (isValidPassword) {
    return _.omit(user, 'password', '__v');
  }
  throw { code: 403, message: 'Invalid password' };
};

export { register, login };
