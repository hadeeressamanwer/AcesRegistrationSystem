const express = require('express');
const bcrypt = require('bcrypt');
const Joi =require('joi');
const router = express.Router();
const _=require('lodash');
const jwt=require('jsonwebtoken');
const { User } = require('../models/user');

router.post('/', async (req, res) => {
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  console.log(user.password);
  if (!user) {console.log('wrong email');return res.status(400).send('Wrong Email or password!');}

  const result = await bcrypt.compare(req.body.password, user.password);
  console.log(result);
  if (!result) {console.log('wrong pass');return res.status(400).send('Wrong Email or password!');}
  const token = await user.generateToken();
  res.send(token);
});
function userValidation(data) {
    const schema = {
      email: Joi.string()
        .email()
        .min(3)
        .required(),
      password: Joi.string()
        .required()
        .min(8)
    };
    return Joi.validate(data, schema);
  }

module.exports = router;