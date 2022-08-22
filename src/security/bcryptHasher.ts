import bcrypt from "bcrypt";
const saltRounds = 10;

function hash(password: string): string {
  return bcrypt.hashSync(password, saltRounds);
}

export = { hash };
