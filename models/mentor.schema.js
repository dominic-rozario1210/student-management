import mongoose from "mongoose";

const mentorSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        }
    },
    {
        timestamps:true
    }
)

const Mentor = mongoose.model("mentor",mentorSchema)

export default Mentor