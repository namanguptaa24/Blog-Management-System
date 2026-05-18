const express = require("express");

const router = express.Router();

const {

   register,
   login,
   getUsers,
   changeRole

} = require("../controllers/authController");

const {
   protect
} = require("../middleware/authMiddleware");

const {
   authorize
} = require("../middleware/roleMiddleware");

router.post(
   "/register",
   register
);

router.post(
   "/login",
   login
);

router.get(

   "/users",

   protect,

   authorize("SUPER_ADMIN"),

   getUsers

);

router.put(

   "/change-role/:id",

   protect,

   authorize("SUPER_ADMIN"),

   changeRole

);

module.exports = router;