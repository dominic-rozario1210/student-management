import mongoose from "mongoose";
import Student from "../models/student.schema.js";
import Mentor from "../models/mentor.schema.js";


export const createStudent = async (req,res) =>{
    try {
        const {name,email,mentor} = req.body;
        
        const newStudent = await Student.create({
            name,
            email,
            mentor
        })

        res.status(201).json({
            message:"student added successfully",
            data:newStudent
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getUnassignedStudents = async (req,res) => {
    try {
        const students = await Student.find({
            mentor:null
        });

        return res.status(200).json({
            success:true,
            count:students.length,
            data:students
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const assignMentor = async (req,res) =>{
    const { studentId } = req.params;
    const { mentorId } = req.body;

    if(!mongoose.isValidObjectId(studentId)){
        return res.status(400).json({
            success:false,
            message:"Enter valid Student ID"
        })
    }
    if(!mongoose.isValidObjectId(mentorId)){
        return res.status(400).json({
            success:false,
            message:"Enter valid mentor ID"
        })
    }
    const student = await Student.findById(studentId); //find student
    const mentor = await Mentor.findById(mentorId);  // find  mentor
    if(!student || !mentor){
        return res.status(404).json({
            success:false,
            message:"Enter valid student or mentor"
        })
    }

    if(student.mentor){
        if(student.mentor.toString() !== mentorId){
            student.previousMentor.push(student.mentor);
        }
    }

    student.mentor = mentorId; // assign new mentor

    await student.save(); // store in database

    return res.status(200).json({
        success:true,
        message:"mentor assigned successfully",
        data:student
    })

}

export const previousMentor = async (req,res) => {
    try {
        const { studentId } =req.params;
        if(!mongoose.isValidObjectId(studentId)){
            return res.status(400).json({
                success:false,
                message:"Invalid student Id"
            })
        }

        const student = await Student.findById(studentId)
              .populate("previousMentor");
        if(!student){
            return res.status(404).json({
                success:false,
                message:"Student not found"
            })
        }

        return res.status(200).json({
            success:true,
            count:student.previousMentor.length,
            data:student.previousMentor
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}