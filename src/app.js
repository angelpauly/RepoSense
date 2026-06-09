import express from "express";

const app=express();

app.get("/",(req,res)=>{
    res.send("Github engineering mentor running");
});

app.listen(3000,()=>{
    console.log("server started");
});