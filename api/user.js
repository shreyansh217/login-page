
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var userModel = require('../modules/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post("/login",function(req,res,next){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    userModel.find({email:email})
    .exec()
    .then(user=>{
        if(user.length<1){
            res.status(404).json({
                message:"Authentication Failure",
            }); 

        }else{
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if(err){
                 res.status(404).json({
                    message:"Authentication Failure",
                }); 
                }
                if(result){

            //  var token = jwt.sign(
            //             {
            //                 username:user[0].username,
            //                 userid:user[0]._id

            //         },
            //             'secret',
            //             {
            //                 expiresIn:"1h"
            //             }
            //         );

                  res.status(200).json({
                        message:"User Found,    YOU CAN NOW ACCESS YOUR DATA",
                        user:user
                    });
                }
                else{
                    res.status(404).json({
                        message:"Authentication Failure",
                    }); 
                }
            });

       
    }
    })
    .catch(err=>{
        res.json({
            error:err
        });
    })
});

router.post("/signup",function(req,res,next){
    var username = req.body.username;
     console.log(username);
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmpassword;
    if(password!==confirmPassword){
        res.json({
            message:"Password not matched!!!!!!",
        });
    }else{
        bcrypt.hash(password, 10, function(err, hash) {
            if(err){
                return res.json({
                    message:"Something wrong ,please try again later!",
                    error:err
                });
            }else{
                console.log(password);
          var userDetails = new userModel({
            _id:mongoose.Types.ObjectId(),
            username:username,
            email:email,
            password:hash 
        });
        userDetails.save()
        .then(doc=>{
            res.status(201).json({
                message:"User Registered Successfully",
                results:doc
            });
        })
        .catch(err=>{
            res.json(err);
        });
            }
        });

    }
    
   
});
module.exports = router;