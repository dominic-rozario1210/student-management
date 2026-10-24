import mongoose from "mongoose"

const studentSchema = mongoose.Schema(
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
        },
        mentor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Mentor",
            default:null
        },
        previousMentor:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"mentor"
            }
        ]
    }
)

const Student = mongoose.model("student",studentSchema)

export default Student