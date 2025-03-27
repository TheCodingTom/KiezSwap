import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error hashing password :>> ", error);
    return null;
  }
};

const verifyPassword = async (plainPassowrd, hashedPassword) => {
  //REVIEW  you use try/catch in the previous function for async code, but not in this one? consistency.
  const isPasswordCorrect = await bcrypt.compare(plainPassowrd, hashedPassword);

  return isPasswordCorrect;
};

export { hashPassword, verifyPassword };
