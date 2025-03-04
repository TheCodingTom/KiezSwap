import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  // in the payload we use predefined infos - jwt claims
  const payload = { sub: userId };
  const options = { expiresIn: "1d" }; // expiration in the options cause if we put it in the payload we have to use "exp" and a numeric date

    // const secretOrPrivateKey = process.env.JWT_SECRET; 
  const secretOrPrivateKey = "password";

  const jwtToken = jwt.sign(payload, secretOrPrivateKey, options);

  if (jwtToken) {
    return jwtToken
  }
  if (!jwtToken) {
    return null
  }
};

export {generateToken}
