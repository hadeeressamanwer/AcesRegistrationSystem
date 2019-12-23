const {User,validateusers}=require('../models/user');
const express=require('express');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcrypt');
const auth = require("../middleware/auth");
const router=express.Router();
     
router.get('/me',auth,async(req,res)=>{const user=await User.findById(req.user)
res.send(_.pick(user,['email','name']))}
)

router.post('/',async(req,res)=>
    {
    const {error}=validateusers(req.body);
       if(error)
       return res.status(400).send(error.details[0].message);    
       let found=await User.findOne({email:req.body.email});
       if (found){return res.status(404).send('this email is Taken choose another one')}
       let user=new User({...req.body});
       user.password=await bcrypt.hash(user.password,10);
       await user.save();
       const token = user .generateToken();
       res.header('x-auth-token',token).send(user);
    });
     
    module.exports=router;