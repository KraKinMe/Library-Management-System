const express=require('express');

const app=express();

const PORT=8081;

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "Home Page"
    })
})


app.all('/*splat',(req,res)=>{
    res.status(500).json({
        message:"Not Built Yet"
    })
})

app.listen(PORT,()=>{
    console.log(`Server on http://localhost:${PORT}`);
})
