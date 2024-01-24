const express=require('express');
const cors=require('cors');

const app=express();
const PORT=8080;
app.use(cors());

app.use('/data',require('./routes/data'));


app.get('*',(req,res)=>{
    res.send("server is running ");
})


app.listen(PORT,()=>{
   console.log("listening on port " +PORT);
})