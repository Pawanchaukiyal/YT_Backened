import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get users details from frontend
  // validation --- is empty
  // check if user alredy exists : by username and email
  // check for images , check for avatar
  // upload them  to cloudinary, avatar
  // create user objects -- create entry in db
  // remove password and request token from field'
  // check for user creation
  // return result

  const { fullName, email, username, password } = req.body;
  console.log("email : ", email);

  //check field is empty or not
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check user already exist or not
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // check avatar is present or not
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // check avatar is here or not
  if (!avatar) {
    throw new ApiError(400, "Avtar file is required");
  }

  // create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    // avatar ko hm check kr chuke hai ab acoverimage ko check karenge agar hoga to url denge nahi to null
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // passwor and refresh token not check
  );
  // check creater user aaya ya nhi
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registring the user");
  }

  // return respone
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
