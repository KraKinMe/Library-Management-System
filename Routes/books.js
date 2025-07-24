const express=require('express');
let {books}=require('../data/books.json');
const router=express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    })
})

router.get('/:id',(req,res)=>{
    const {id}=req.params;
    const thisBook=books.find((each)=>each.id===id);
    if(!thisBook){
        return res.status(404).json({
            success:false,
            message:`No book with ID: ${id}`
        });
    }
    res.status(200).json({
        success:true,
        data:thisBook
    })
})


router.post('/',(req,res)=>{
    // "id": "3",
    //   "name": "The Land Before Time",
    //   "author": "Alan Moore",
    //   "genre": "Children's",
    //   "price": "8.50",
    //   "publisher"
    const {id,name,author,genre,price,publisher}=req.body;
    
    
    if(!id || !name || !author || !genre || !price || !publisher){
        return res.status(400).json({
            success:false,
            message:"Please provide all the details"
        })
    }
    
    const thisBook=books.find((each)=>each.id===id);

    if(thisBook){
        return res.status(409).json({
            success:false,
            message:`Book by ID:${id} already exists`
        })
    }

    let newBook={id,name,author,genre,price,publisher}

    books.push(newBook);

    res.status(201).json({
        success:true,
        message:`Book added successfully`
    })
    
})


module.exports=router;
//