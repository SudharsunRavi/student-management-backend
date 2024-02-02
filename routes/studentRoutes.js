const router = require('express').Router();
const Student = require('../models/studentModel');

const asyncHandler = require('express-async-handler');

// Create a new student
router.post("/", asyncHandler(async(req,res)=>{
    try {
        const student=await Student.create(req.body)
        res.status(201).json(student)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}))

// Fetch student by register number
router.get("/:registerNumber", asyncHandler(async(req,res)=>{
    try{
        const student=await Student.findOne({registerNumber:req.params.registerNumber})
        if(!student){
            res.status(404).json({message:"Student not found"})
        }
        res.status(200).json(student)
    }catch(error){
        res.status(400).json({message:error.message})
    }
}))

// Fetch all students name, register number using department
router.get("/department/:department", asyncHandler(async(req,res)=>{
    try {
        const studentsOfDept=await Student.find({department:req.params.department}).select('name registerNumber')
        if(studentsOfDept.length===0){
            res.status(404).json({message:`No students found in ${req.params.department}`})
        }
        res.status(200).json(studentsOfDept)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}))

// Update all fields except unique fields
router.put("/:registerNumber", asyncHandler(async(req, res) => {
    try {
        const existingStudent = await Student.findOne({ registerNumber: req.params.registerNumber });
        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        const updateStudent= await Student.findOneAndUpdate({registerNumber:req.params.registerNumber},req.body,{new:true})
        if(!updateStudent){
            return res.status(500).json({message:"Error updating student"})
        }
        res.status(200).json(updateStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}));

// Delete a student
router.delete("/:registerNumber", asyncHandler(async(req,res)=>{
    try {
        const student=await Student.findOne({registerNumber:req.params.registerNumber})
        if(!student){
            res.status(404).json({message:"Student not found"})
        }

        const deleteStudent=await Student.findOneAndDelete({registerNumber:req.params.registerNumber})
        if(!deleteStudent){
            res.status(500).json({message:"Error deleting student"})
        }

        res.status(200).json({message:"Student deleted successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}))

module.exports=router