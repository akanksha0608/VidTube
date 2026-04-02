/*
owner ObjectId users
  videFile string 
  thumbnail string
  title string
  description string
  duration number
  views number
  isPublished boolean
  createdAt Date
  updateAt Date
*/ 
import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
//this mogooese agreegate paginate plugin will help in pagination of videos while fetching multiple videos from db 
//which means that instead of fetching all videos at once we can fetch a limited number of videos at a time
const videoSchema = new Schema({
    videoFile:{
        type:String,   //Cloudinary URL
        required:true,
    },
    thumbnail:{
    type:String,   //Cloudinary URL
    required:true,
    },
    title:{
    type:String,
    required:true,

    },
    description:{
    type:String,
    required:true, 
    },
    views:{
    type:Number,
    default:0,

    },
    duration:{
    type:Number,
    required:true,
    },
    isPublished:{
    type:Boolean,
    default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
},
{timestamps:true}
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video=mongoose.model("Video",videoSchema)