const User = require("../models/user");

const getUsers =
async(req,res,next)=>{

   try{

      const users =
      await User.find()
      .select("-password");

      res.status(200).json(
         users
      );

   }catch(error){

      next(error);

   }

};

const updateUserRole =
async(req,res,next)=>{

   try{

      const { role } =
      req.body;

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

      user.role = role;

      await user.save();

      res.status(200).json({

         message:
         "Role Updated"

      });

   }catch(error){

      next(error);

   }

};

const updateUserStatus =
async(req,res,next)=>{

   try{

      const { status } =
      req.body;

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

      user.status = status;

      await user.save();

      res.status(200).json({

         message:
         "Status Updated"

      });

   }catch(error){

      next(error);

   }

};

const deleteUser =
async(req,res,next)=>{

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

      next(error);

   }

};

module.exports = {

   getUsers,
   updateUserRole,
   updateUserStatus,
   deleteUser

};