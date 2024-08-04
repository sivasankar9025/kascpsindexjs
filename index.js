const mongoose=require('mongoose')
const {model}=require("./schema")
const express=require("express")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
const mongooseConnect=async ()=>{
    try{
      await mongoose.connect("mongodb+srv://pssm9025528322:9025528322@cluster0.altz4n8.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0")
      console.log("Db connected")
    }
    catch(err){
      console.log(err)
    }
    }
app.post("/post",async(req,res)=>{
   const date=new Date()
   const { name, registerNo, gender,graduate,hsc,myambition,dept,dob}=req.body
   const response=new model({ name, registerNo, gender,graduate,hsc,myambition,dept,dob,date})
   const a=await response.save()
   res.json({id:a._id,message: 'Data saved successfully'})
})
app.get("/get",async(req,res)=>{
    const response=await model.find({})
    res.json({response})
})

app.post("/score",async(req,res)=>{
    const {title,score}=req.body
    const response=new scoremodel({title,score})
    await response.save()
    res.send("score saved")
})
app.put("/update/:id",async(req,res)=>{
    const id=req.params.id
    const {arr}=req.body
    console.log(id)
    console.log(arr)
    const response=await model.updateOne({_id:id},{arr:arr})
    res.send("updated")
})
app.listen(5000|| process.env.PORT,()=>console.log("Port connected"))
 
 mongooseConnect()