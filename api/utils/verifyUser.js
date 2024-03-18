import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {
  console.log(req);
  const token = req.cookies.access_token;
  console.log("Token - ", token);
  res.json({ token });
  // if (token === undefined) {
  //   return next(errorHandler(401, "Unauthorized: Token is missing"));
  // }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized: Invalid or expired token"));
    }
    req.user = user;
    next();
  });
};
