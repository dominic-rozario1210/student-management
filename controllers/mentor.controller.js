import mongoose from "mongoose"
import Mentor from "../models/mentor.schema.js";
import Student from "../models/student.schema.js";


export const createMentor = async (req,res) => {
    try {
        const {name,email} = req.body;

        const newMember = await Mentor.create({
            name,
            email
        })

        res.status(201).json({
            message:"mentor added successfully",
            mentor:newMember
        })

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const assignStudents = async (req,res) => {
    try {
        const {mentorId} = req.params;
        const {studentIds} = req.body;

        if(!mongoose.isValidObjectId(mentorId)){
            return res.status(400).json({
                success:false,
                message:"Invalid mentorId"
            })
        }
        if(!Array.isArray(studentIds) || studentIds.length === 0){
            return res.status(400).json({
                success:false,
                message:"student ID must not be empty"
            })
        }
        if(!studentIds.every(id => mongoose.isValidObjectId(id))){
            return res.status(400).json({
                success:false,
                message:"IDs Invalid"
            })
        }

        const mentor = await Mentor.findById(mentorId)
        if(!mentor){
            return res.status(404).json({success:false,message:"mentor not found"})
        }

        const result = await Student.updateMany(
            {
                _id:{$in :studentIds},mentor:null
            },
            {
                $set:{mentor:mentorId}
            }
        );

        res.status(200).json({
            success:true,
            message:"student asssigned to mentor",
            data:result
    
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getMentorStudents = async (req,res) => {
    try {
        const { mentorId } = req.params;

        if(!mongoose.isValidObjectId(mentorId)){
            return res.status(400).json({
                success:true,
                message:"Invalid Mentor ID"
            })
        }

        const mentor = await Mentor.findById(mentorId)
        if(!mentor){
            return res.status(404).json({
                success:false,
                message:"Mentor not found"
            })
        }
        const Students = await Student.find({
            mentor:mentorId
        })
        res.status(200).json({
            success:true,
            count:Students.length,
            data:Students
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}