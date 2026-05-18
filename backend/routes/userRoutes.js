const express = require("express");

const router = express.Router();

const {

   getUsers,
   updateUserRole,
   updateUserStatus,
   deleteUser

} = require("../controllers/userController");

const {

   protect

} = require("../middleware/authMiddleware");

const {

   authorize

} = require("../middleware/roleMiddleware");

router.get(

   "/",

   protect,

   authorize("SUPER_ADMIN"),

   getUsers

);

router.put(

   "/role/:id",

   protect,

   authorize("SUPER_ADMIN"),

   updateUserRole

);

router.put(

   "/status/:id",

   protect,

   authorize("SUPER_ADMIN"),

   updateUserStatus

);

router.delete(

   "/:id",

   protect,

   authorize("SUPER_ADMIN"),

   deleteUser

);

module.exports = router;