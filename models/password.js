import bcryptjs from "bcryptjs";

async function hash(plainTextPassword) {
  const saltRounds = getNumberOfSaltRounds();
  const hashedPassword = await bcryptjs.hash(plainTextPassword, saltRounds);
  return hashedPassword;
}

function getNumberOfSaltRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(plainTextPassword, hashedPassword) {
  const isMatch = await bcryptjs.compare(plainTextPassword, hashedPassword);
  return isMatch;
}

const password = {
  hash,
  compare,
};

export default password;
