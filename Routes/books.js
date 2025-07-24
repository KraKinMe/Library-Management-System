const express=require('express');
let {books}=require('../data/books.json');
const router=express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    })
})

// router.get('/:id',(req,res)=>{
//     const {id}
// })


module.exports=router;