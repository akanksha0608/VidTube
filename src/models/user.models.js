u/*
  _id string pk
  username string
  email string
  fullName string
  avatar string
  coverImage string
  watchHistory ObjectId[] videos
  password string
  refreshToken string
  createdAt Date
  updateAt Date
*/

import mongoose ,{Schema, schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jwtwebtoken";

const userSchema = new Schema({
  username: {
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,
  },
  email: {
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  },
  fullName: {
    type:String,
    required:true,
    trim:true,
    index:true,
  },
avatar: {
    type:String,    //Cloudinary URL
    required:true,
    
},
coverImage: {
    type:String,    //Cloudinary URL 
},
watchHistory: [
  {
    type:Schema.Types.ObjectId,
    ref:"Video",
  }
],
password: {
    type:String,
    required:[true,"Password is required"],

},
refreshToken: {
    type:String,
}

  },
  {timestamps:true}
);

userSchema.pre("save",async function(next){
  return await bcrypt.compare(password , this.password)
  next()
})

userSchema.methods.generateAccessToken= function(){
  //short lived access token which means its expiry time depends on you how long you want it to be
  jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    fullName:this.fullName,
  },
  process.env.ACCESS_TOKEN_SECRET ,
  {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
);
}



userSchema.methods.generateRefreshToken= function(){
  jwt.sign({
    _id:this._id,
    
  },
  process.env.REFRESH_TOKEN_SECRET ,
  {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
);
}
export const User =mongoose.model("User",userSchema)
