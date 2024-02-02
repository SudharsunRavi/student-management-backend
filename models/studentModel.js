const mongoose=require("mongoose")

const studentSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        registerNumber:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        department:{
            type:String,
        },
        dob:{
            type:Date,
        }, 
        gender:{
            type:String,
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('student',studentSchema)