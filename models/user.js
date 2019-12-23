const mongoose= require ('mongoose');
const Joi =require('joi');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const userschema=new mongoose.Schema({
    name:{type:String,minlength:5,maxlength:255,required:true},
        email:{type:String,minlength:5,maxlength:255,required:true,unique:true,lowercase:true},
        password:{type:String,minlength:5,maxlength:1024,required:true},
      })
     userschema.methods.generateToken=function(){
         
      const token=jwt.sign({_id:this._id},"privatekey");
      return token;
     };
      const User=mongoose.model('User',userschema);


    function validateusers(user)
{

    const schema=
    {    name:Joi.string().min(5).max(255).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user,schema);
}
exports.User=User;
exports.validateusers=validateusers;