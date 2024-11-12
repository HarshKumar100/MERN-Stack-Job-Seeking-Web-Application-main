//thefunction ek paramter hai jo hamne khud se banaya hai
export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);  
  };
};
