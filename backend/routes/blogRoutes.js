const express = require("express");

const router = express.Router();

const {

   createBlog,
   getBlogs,
   getDraftBlogs,
   getBlogBySlug,
   getBlogById,
   updateBlog,
   deleteBlog,
   publishBlog

} = require("../controllers/blogController");

const {

   protect

} = require("../middleware/authMiddleware");

const {

   authorize

} = require("../middleware/roleMiddleware");

const upload = require(
   "../middleware/uploadMiddleware"
);

router.post(

   "/create",

   protect,

   authorize(
      "SUPER_ADMIN",
      "EDITOR",
      "AUTHOR"
   ),

   upload.fields([

      {
         name:"featureImage",
         maxCount:1
      },

      {
         name:"ogImage",
         maxCount:1
      }

   ]),

   createBlog

);

router.get(
   "/",
   getBlogs
);

router.get(

   "/drafts",

   protect,

   getDraftBlogs

);

router.get(

   "/edit/:id",

   protect,

   getBlogById

);

router.get(
   "/:slug",
   getBlogBySlug
);

router.put(

   "/update/:id",

   protect,

   authorize(
      "SUPER_ADMIN",
      "EDITOR",
      "AUTHOR"
   ),

   upload.fields([

      {
         name:"featureImage",
         maxCount:1
      },

      {
         name:"ogImage",
         maxCount:1
      }

   ]),

   updateBlog

);

router.put(

   "/publish/:id",

   protect,

   authorize(
      "SUPER_ADMIN",
      "EDITOR",
      "AUTHOR"
   ),

   publishBlog

);

router.delete(

   "/delete/:id",

   protect,

   authorize(
      "SUPER_ADMIN",
      "EDITOR",
      "AUTHOR"
   ),

   deleteBlog

);

module.exports = router;