import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/email.js";
import twilio from 'twilio';
import otpGenerator from 'otp-generator';




const accountSid=process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;



const client = twilio(accountSid, authToken);


export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  
  const Otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  // console.log("here")
  client.messages
    .create({
      body: `Hello, your registration OTP is ${Otp}`,
      to: '+919813165574', // Text your number
      from: '+17579030329', // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.error(error )); // Add error handling

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
    Otp,
  });
  sendEmail(email);
  sendToken(user, 201, res, "User Registered!");
});

export const Otpverification = catchAsyncErrors(async (req, res, next) => {
  console.log("here")
  const {enteredOtp, generatedOtp, email} = req.body;
  console.log(enteredOtp, generatedOtp, email);
     
  if(enteredOtp === generatedOtp) 
  {
     res.status(200).json({msg: 'Otp verified successful'});
  }
  else {
    res.status(400).json({msg: 'Otp verification failed..'});
  }
})

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});


export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});