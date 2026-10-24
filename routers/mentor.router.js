import express from "express";
import { assignStudents, createMentor, getMentorStudents } from "../controllers/mentor.controller.js";


const router = express.Router();

router.post("/",createMentor)

router.put("/:mentorId/assign-students",assignStudents)

router.get("/:mentorId/students",getMentorStudents)

export default router

