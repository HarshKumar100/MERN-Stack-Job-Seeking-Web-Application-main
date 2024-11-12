import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  //agar user ke pass token hua toh decode kr denge
  //In simple terms, decoding in JavaScript means turning data back into its original form after it has been changed or "encoded" for safety, security, or formatting reasons. Here's why we use it:
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

 //user ka token decode krne ke ose hamare pass is decode ke andar hamara pura user save hojayega
 //user save hone ke baad req.user nam se ek variable banaya hai

 //import { User } from "../models/userSchema.js";
 //user ki detail isme se ayi hai
  req.user = await User.findById(decoded.id);

  next();
});
