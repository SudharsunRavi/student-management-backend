const  mongoose  = require("mongoose")

const dbConnection=async()=>{
    try {
        const connection=await mongoose.connect(process.env.DB_CONNECT)
        console.log(`Connected to ${connection.connection.host}`)
    } catch (error) {
        console.log(error)
    }   
}

module.exports=dbConnection