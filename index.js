const mongoose= require ('mongoose');
const login = require('./Routes/login.js');
const express=require('express');
const signup = require("./Routes/signup");
const app=express();
mongoose.connect('mongodb://localhost/mongo-loginsystem', { useNewUrlParser: true ,useUnifiedTopology: true  })
.then (()=>console.log("successfully connected"))
.catch(err=>console.log('not connected'));
app.get("/", (req, res) => {
    res.send("hello");
  });

app.use (express.json());
app.use('/api/login',login);
app.use("/api/signup", signup);
const port=process.env.port || 6777;
app.listen(port,()=>console.log(`listening on port ${port}..`));
