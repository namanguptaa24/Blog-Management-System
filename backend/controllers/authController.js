const User =
require("../models/User");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

exports.register =
async(req,res)=>{

   try{

      const {

         name,
         email,
         password,
         role

      } = req.body;

      const existingUser =
      await User.findOne({

         email

      });

      if(existingUser){

         return res
         .status(400)
         .json({

            message:
            "User already exists"

         });

      }

      const user =
      await User.create({

         name,

         email,

         password,

         role,

         status:"active"

      });

      res.status(201).json({

         message:
         "User Registered",

         user:{

            _id:user._id,

            name:user.name,

            email:user.email,

            role:user.role,

            status:user.status

         }

      });

   }catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};

exports.login =
async(req,res)=>{

   try{

      const {

         email,
         password

      } = req.body;

      const user =
      await User.findOne({

         email

      });

      if(!user){

         return res
         .status(400)
         .json({

            message:
            "Invalid Credentials"

         });

      }

      if(

         user.status ===
         "blocked"

      ){

         return res
         .status(403)
         .json({

            message:
            "Your account is blocked"

         });

      }

      if(

         user.status ===
         "suspended"

      ){

         return res
         .status(403)
         .json({

            message:
            "Your account is suspended"

         });

      }

      const isMatch =
      await bcrypt.compare(

         password,

         user.password

      );

      if(!isMatch){

         return res
         .status(400)
         .json({

            message:
            "Invalid Credentials"

         });

      }

      const token =
      jwt.sign(

         {

            id:user._id,

            role:user.role

         },

         process.env.JWT_SECRET,

         {

            expiresIn:"7d"

         }

      );

      res.status(200).json({

         message:
         "Login Success",

         token,

         user:{

            _id:user._id,

            name:user.name,

            email:user.email,

            role:user.role,

            status:user.status

         }

      });

   }catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};

exports.getUsers =
async(req,res)=>{

   try{

      const users =
      await User.find()
      .select("-password");

      res.status(200).json(
         users
      );

   }catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};

exports.changeRole =
async(req,res)=>{

   try{

      const user =
      await User.findByIdAndUpdate(

         req.params.id,

         {

            role:req.body.role

         },

         {

            new:true,

            runValidators:true

         }

      ).select("-password");

      if(!user){

         return res
         .status(404)
         .json({

            message:
            "User Not Found"

         });

      }

      res.status(200).json({

         message:
         "Role Updated",

         user

      });

   }catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};

exports.updateUserStatus =
async(req,res)=>{

   try{

      const user =
      await User.findByIdAndUpdate(

         req.params.id,

         {

            status:req.body.status

         },

         {

            new:true,

            runValidators:true

         }

      ).select("-password");

      if(!user){

         return res
         .status(404)
         .json({

            message:
            "User Not Found"

         });

      }

      res.status(200).json({

         message:
         "Status Updated",

         user

      });

   }catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};

exports.deleteUser =
async(req,res)=>{

   try{

      const user =
      await User.findById(
         req.params.id
      );

      if(!user){

         return res
         .status(404)
         .json({

            message:
            "User Not Found"

         });

      }

      await user.deleteOne();

      res.status(200).json({

         message:
         "User Deleted"

      });

   }catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};