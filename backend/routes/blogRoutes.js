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
   publishBlog,

   // NEW CONTROLLERS

   getBlogsByCategory,
   getBlogsByTag,
   getBlogsByAuthor

} = require("../controllers/blogController");

const {

   protect

} = require("../middleware/authMiddleware");

const {

   authorize

} = require("../middleware/roleMiddleware");

const upload =
require("../middleware/uploadMiddleware");


// =============================
// CREATE BLOG
// =============================

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


// =============================
// GET ALL BLOGS
// =============================

router.get(
   "/",
   getBlogs
);


// =============================
// GET DRAFT BLOGS
// =============================

router.get(

   "/drafts",

   protect,

   getDraftBlogs

);


// =============================
// GET BLOG BY ID
// =============================

router.get(

   "/edit/:id",

   protect,

   getBlogById

);


// =============================
// CATEGORY BLOGS
// =============================

router.get(

   "/category/:category",

   getBlogsByCategory

);


// =============================
// TAG BLOGS
// =============================

router.get(

   "/tag/:tag",

   getBlogsByTag

);


// =============================
// AUTHOR BLOGS
// =============================

router.get(

   "/author/:author",

   getBlogsByAuthor

);


// =============================
// GET BLOG BY SLUG
// =============================

router.get(

   "/:slug",

   getBlogBySlug

);


// =============================
// UPDATE BLOG
// =============================

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


// =============================
// PUBLISH BLOG
// =============================

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


// =============================
// DELETE BLOG
// =============================

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