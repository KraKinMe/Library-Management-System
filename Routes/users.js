const express=require('express');
let {users}=require("../data/users.json");
const router=express.Router();
/**
 * Route:/users
 * Method:GET
 * Desc: Gets all users data
 * Access:Public
 * Paramenters:None
 */

router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
})

/**
 * Route:/users/:ID
 * Method:GET
 * Desc: Gets a user data by ID
 * Access:Public
 * Paramenters: ID
 */

router.get('/:id',(req,res)=>{

    const {id}=req.params;
    const user=users.find((each)=>{
        if(each.id===id){
            return each;
        }
    })

    if(!user){
        return res.status(404).json({
            success:false,
            message:`User Not Found`
        })
    }

    res.status(200).json({
        success:true,
        data: user
    })
})


/**
 * Route:/users
 * Method:POST
 * Desc: Create a new UserGets a user data by ID
 * Access:Public
 * Paramenters: None
 */


router.post('/',(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate}=req.body;
    
    if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
        return res.status(400).json({
            success:false,
            message:"Please provide all the details"
        })
    }
    
    const user=users.find((each)=>{
        if(each.id===id){
            return each;
        }
    })
    
    if(user){
        return res.status(409).json({
            success:false,
            message:"User Already exists"
        })
    }
    
    users.push({
        id,name,surname,email,subscriptionType,subscriptionDate
    })
    
    res.status(201).json({
        success:true,
        message:"User Created successfully"
    })
})


/**
 * Route:/users/:id
 * Method:PUT
 * Desc: Updating a user by ID
 * Access:Public
 * Paramenters: ID
 */

router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    
    const user= users.find((each)=>each.id===id)
    
    if(!user){
        return res.status(404).json({
            success:false,
            message:`User Not Found for ${id}`
        })
    }
    
    //Spread Operator (...)
    
    users=users.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data
            }
        }
        return each;
    })
    
    res.status(200).json({
        success:true,
        message:`User Updated Successfully`
    })
})



/**
 * Route:/users/:id
 * Method:DELETE
 * Desc: Deleting a user by ID
 * Access:Public
 * Paramenters: ID
 */


router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    const index=users.findIndex((each)=>each.id===id);

    if(index===-1){
        return res.status(404).json({
            success:false,
            messaage:`No user with ID: ${id}`
        })
    }

    users.splice(index,1);

    return res.status(200).json({
        success:true,
        message:`User has been deleted`
    })
});

/**
 * Route: /subscription/:id
 * Method: GET
 * Desc: Get Subscription of users
 * Access: Public
 * Parameters: ID
 */

router.get('/subscription/:id',(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:`No User found for ${id}`
        });
    }

    const getDateInDays= (data='')=>{
        let date;
        if(data){
            date=new Date(data);
        }
        else{
            date=new Date();
        }
        const today=new Date();
        const diffTime=Math.abs(today-date);
        return Math.ceil(diffTime/(1000*60*60*24));
    }

    const subscriptionType=(date)=>{
        if(user.subscriptionType==="Basic"){
            date=date+90;
        }
        else if(user.subscriptionType==="Premium"){
            date=date+365;
        }

        return date;
    }
    
    let returnDate=getDateInDays(user.returnDate);
    let currentDate=getDateInDays();
    let subscriptionDate=getDateInDays(user.subscriptionDate);
    let subscriptionExpiration=subscriptionType(subscriptionDate);


    const data={
        ...user,
        subscriptionExpired:subscriptionExpiration<currentDate,
        subscriptionDaysLeft:subscriptionExpiration-currentDate,
        daysLeftForExpiration:returnDate-currentDate,
        returnDate:returnDate<currentDate?"Book is overdue":returnDate,
        fine:returnDate<currentDate?subscriptionExpiration<=currentDate?200:100:0
    }

    res.status(200).json({
        success:true,
        data
    })
})

module.exports=router;