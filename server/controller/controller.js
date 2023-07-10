const User=require("../model/model");
// create and save new user
exports.create= async(req,res)=>{
    // extract info
    try{
        const {name,email,gender,status}=req.body
       const user=  User.create({
            name,
            email,
            gender,
            status
        })
        // res.status(201).json({
        //     success:true,
        //     message:"user created successfully",
        //     user
        // })
        res.redirect("/")
    }
    catch(err){
console.log(err)
res.status(400).json({
    success:false,
    message:err.message,
})

    }
}

// retrive and return all users/retrive all and return a single user
exports.find=(req,res)=>{
if(req.query.id){
    const id=req.query.id;
    User.findById(id)
    .then(data=>{
        if(!data){
            res.status(500).send({message:`cannot get the id ${id}`})
        }
        else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(400).send({message:'sorry for inconvenient'})
    })
}

else{
    User.find()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({message:err.message})
    })
}
}
// to update 
exports.update=(req,res)=>{
    if(!req.body){
      return  res.status(400).send({
            message:"data to update can not be empty"
        })
    }
    const id=req.params.id;
    User.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(400).send({message:'cannot Update user with '+id+' may be user not found' })
        }
        else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"my error updated error"})
    })
    
}
// to delete with specified user id in the request
exports.delete=(req,res)=>{
    const id=req.params.id;
   User.findByIdAndDelete(id)
   .then(data=>{
    if(!data){res.status(404).send({message:`cannot delete with ${id}. May id is wrong`})}
    else{
        res.send({
            message:'User is deleted successfully'
        })
    }
   })
   .catch(err=>{
    res.status(500).send({message:`could not deleted user of id  ${id}`})
   });
    
}