const express=require('express');

const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "Home Page"
    })
})

//Routers
const userRouter=require('./Routes/users.js');
app.use('/users',userRouter);

const bookRouter=require('./Routes/books.js');
app.use('/books',bookRouter);
//THIS IS THE GENERAL END

app.all('/*splat',(req,res)=>{
    res.status(500).json({
        message:"Not Built Yet"
    })
})


const PORT=8081;
app.listen(PORT,()=>{
    console.log(`Server on http://localhost:${PORT}`);
})
