//ye isliye kr rahe hai agar account register kiya toh direct login ho jayenge
//sendToken mein jo parameter hai vo hamne apni marzi se diye hai
export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
