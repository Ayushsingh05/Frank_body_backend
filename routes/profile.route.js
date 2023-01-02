const {Router} = require("express");
const user = require('../models/user.model');
const route = Router();

// profile page route 
route.get("/", (req, res)=>{

    res.send({message:"profile page"})

})

route.post("/", async (req, res)=>{

    let requiredData = req.body;

  let userdata = {

    email: requiredData.email,
    firstname: requiredData.firstname,
    lastname: requiredData.lastname,
    mobile: requiredData.mobile,
    gender: requiredData.gender

  };

  // updating the address data with email reference
  try{

    await user.updateOne({email:userdata.email},{$set:{address:[userdata]}});

  }catch(err){

     res.status(500).send({message:err});

  }
  
  
  // getting the updated user data
  try{

    var dbData = await user.find({email:userdata.email});

  }catch(err){

     res.status(500).send({message:err});

  }
 

  
  res.send({message:dbData});
  
})


route.get("/:id",async (req, res)=>{
     
     let userID = req.params.id
     

    try{
        var userdata = await user.find({_id:userID});
        
        res.send({message:userdata})
    }catch(err){
        res.status(500).send({error:err});
    }
     console.log(userdata);

    
})

module.exports = route;