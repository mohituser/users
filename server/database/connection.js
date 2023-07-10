const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        // mongodbconnection
        const uri=`mongodb+srv://admin:admin4321@cluster0.z3yxm3c.mongodb.net/users`;
        const con=await mongoose.connect(uri);
        console.log("mongodb connected  ", con.connection.host);
    }
    catch(err){
console.log(err);
process.exit(1);
    }
}
module.exports=connectDB;