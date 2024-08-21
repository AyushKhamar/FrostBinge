import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
  return token;
};

/*
steps for auth and initial setup
npm init and package.json
dotenv setup add env variables
add routes to seperate folder and export their routers
connect to db using mongoose 
write an authRouter
implement login, logout and signup functions
in signup, take data from req.body (to get the same we might have to use express middlewares like json or urlencoded), now we will first hash the password using bcrypt and salt, then add the user to the db and also send the user Id to jwt so that it can write a token for the same, we have to define a jwt secret in dotenv file, After jwt signs the token, we will return the token and in signup function we will assign a cookie with that name

in login, we get email and password, we find the user with email, the password, bcryptjs.compare already has the salt so you dont need to save it, you just provide current password and stored password to the function and check the response.
After that again set the cookie 

in logout, we will just clear the cookie.
*/
