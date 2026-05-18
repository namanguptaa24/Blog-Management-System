const Blog = require("../models/Blog");

const slugify = require("slugify");


// =====================================
// CREATE BLOG
// =====================================

exports.createBlog = async(req,res)=>{

   try{

      const slug = slugify(

         req.body.title,

         {
            lower:true
         }

      );

      const blog =
      await Blog.create({

         title:req.body.title,

         slug,

         content:req.body.content,

         metaTitle:
         req.body.metaTitle,

         metaDescription:
         req.body.metaDescription,

         canonicalUrl:
         req.body.canonicalUrl,

         ogTitle:
         req.body.ogTitle,

         ogDescription:
         req.body.ogDescription,

         twitterTitle:
         req.body.twitterTitle,

         twitterDescription:
         req.body.twitterDescription,

         featureImage:

         req.files?.featureImage?.[0]?.path

         ||

         "",

         ogImage:

         req.files?.ogImage?.[0]?.path

         ||

         "",

         tags:

         Array.isArray(req.body.tags)

         ?

         req.body.tags

         :

         req.body.tags?.split(","),

         categories:

         Array.isArray(req.body.categories)

         ?

         req.body.categories

         :

         req.body.categories?.split(","),

         faq:[

            {

               question:
               req.body.faqQuestion,

               answer:
               req.body.faqAnswer

            }

         ],

         internalLinks:

         Array.isArray(
            req.body.internalLinks
         )

         ?

         req.body.internalLinks

         :

         req.body.internalLinks?.split(","),

         externalLinks:

         Array.isArray(
            req.body.externalLinks
         )

         ?

         req.body.externalLinks

         :

         req.body.externalLinks?.split(","),

         status:req.body.status,

         author:req.user.id

      });

      res.status(201).json({

         message:"Blog Created",

         blog

      });

   }

   catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};


// =====================================
// GET PUBLISHED BLOGS
// =====================================

exports.getBlogs = async(req,res)=>{

   try{

      const blogs =
      await Blog.find({

         status:"published"

      })

      .populate(

         "author",

         "name email role"

      )

      .sort({

         createdAt:-1

      });

      res.status(200).json(blogs);

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};


// =====================================
// GET DRAFT BLOGS
// =====================================

exports.getDraftBlogs = async(req,res)=>{

   try{

      let query = {

         status:"draft"

      };

      // AUTHOR
      // ONLY OWN DRAFTS

      if(

         req.user.role === "AUTHOR"

      ){

         query.author =
         req.user.id;

      }

      // SUPER_ADMIN + EDITOR
      // SEE ALL DRAFTS

      if(

         req.user.role === "SUPER_ADMIN"

         ||

         req.user.role === "EDITOR"

      ){

         query = {

            status:"draft"

         };

      }

      // VIEWER BLOCKED

      if(

         req.user.role === "VIEWER"

      ){

         return res.status(403).json({

            message:"Access Denied"

         });

      }

      const blogs =
      await Blog.find(query)

      .populate(

         "author",

         "name email role"

      )

      .sort({

         createdAt:-1

      });

      res.status(200).json(blogs);

   }

   catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};


// =====================================
// GET BLOG BY SLUG
// =====================================

exports.getBlogBySlug = async(req,res)=>{

   try{

      const blog =
      await Blog.findOne({

         slug:req.params.slug

      })

      .populate(

         "author",

         "name email role"

      );

      if(!blog){

         return res.status(404).json({

            message:"Blog Not Found"

         });

      }

      res.status(200).json(blog);

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};


// =====================================
// GET BLOG BY ID
// =====================================

exports.getBlogById = async(req,res)=>{

   try{

      const blog =
      await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({

            message:"Blog Not Found"

         });

      }

      // AUTHOR SECURITY

      if(

         req.user.role === "AUTHOR"

         &&

         blog.author.toString() !==
         req.user.id

      ){

         return res.status(403).json({

            message:"Access Denied"

         });

      }

      res.status(200).json(blog);

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};


// =====================================
// GET BLOGS BY CATEGORY
// =====================================

exports.getBlogsByCategory = async(req,res)=>{

   try{

      const blogs =
      await Blog.find({

         categories:{

            $regex:req.params.category,

            $options:"i"

         },

         status:"published"

      })

      .populate(

         "author",

         "name email role"

      )

      .sort({

         createdAt:-1

      });

      res.status(200).json(blogs);

   }

   catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};


// =====================================
// GET BLOGS BY TAG
// =====================================

exports.getBlogsByTag = async(req,res)=>{

   try{

      const blogs =
      await Blog.find({

         tags:{

            $regex:req.params.tag,

            $options:"i"

         },

         status:"published"

      })

      .populate(

         "author",

         "name email role"

      )

      .sort({

         createdAt:-1

      });

      res.status(200).json(blogs);

   }

   catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};


// =====================================
// GET BLOGS BY AUTHOR
// =====================================

exports.getBlogsByAuthor = async(req,res)=>{

   try{

      const blogs =
      await Blog.find({

         status:"published"

      })

      .populate(

         "author",

         "name email role"

      )

      .sort({

         createdAt:-1

      });

      const filteredBlogs =
      blogs.filter((blog)=>

         blog.author?.name
         ?.toLowerCase()
         .includes(

            req.params.author
            .toLowerCase()

         )

      );

      res.status(200).json(

         filteredBlogs

      );

   }

   catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};


// =====================================
// UPDATE BLOG
// =====================================

exports.updateBlog = async(req,res)=>{

   try{

      const blog =
      await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({

            message:"Blog Not Found"

         });

      }

      // AUTHOR SECURITY

      if(

         req.user.role === "AUTHOR"

         &&

         blog.author.toString() !==
         req.user.id

      ){

         return res.status(403).json({

            message:"Access Denied"

         });

      }

      blog.title =
      req.body.title;

      blog.slug =
      slugify(

         req.body.title,

         {
            lower:true
         }

      );

      blog.content =
      req.body.content;

      blog.metaTitle =
      req.body.metaTitle;

      blog.metaDescription =
      req.body.metaDescription;

      blog.canonicalUrl =
      req.body.canonicalUrl;

      blog.ogTitle =
      req.body.ogTitle;

      blog.ogDescription =
      req.body.ogDescription;

      blog.twitterTitle =
      req.body.twitterTitle;

      blog.twitterDescription =
      req.body.twitterDescription;

      blog.status =
      req.body.status;

      blog.tags =

      Array.isArray(req.body.tags)

      ?

      req.body.tags

      :

      req.body.tags?.split(",");

      blog.categories =

      Array.isArray(req.body.categories)

      ?

      req.body.categories

      :

      req.body.categories?.split(",");

      blog.internalLinks =

      Array.isArray(
         req.body.internalLinks
      )

      ?

      req.body.internalLinks

      :

      req.body.internalLinks?.split(",");

      blog.externalLinks =

      Array.isArray(
         req.body.externalLinks
      )

      ?

      req.body.externalLinks

      :

      req.body.externalLinks?.split(",");

      blog.faq = [

         {

            question:
            req.body.faqQuestion,

            answer:
            req.body.faqAnswer

         }

      ];

      // FEATURE IMAGE

      if(

         req.files?.featureImage?.[0]

      ){

         blog.featureImage =

         req.files
         .featureImage[0]
         .path;

      }

      // OG IMAGE

      if(

         req.files?.ogImage?.[0]

      ){

         blog.ogImage =

         req.files
         .ogImage[0]
         .path;

      }

      await blog.save();

      res.status(200).json({

         message:"Blog Updated",

         blog

      });

   }

   catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};


// =====================================
// PUBLISH BLOG
// =====================================

exports.publishBlog = async(req,res)=>{

   try{

      const blog =
      await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({

            message:"Blog Not Found"

         });

      }

      // AUTHOR SECURITY

      if(

         req.user.role === "AUTHOR"

         &&

         blog.author.toString() !==
         req.user.id

      ){

         return res.status(403).json({

            message:"Access Denied"

         });

      }

      blog.status = "published";

      await blog.save();

      res.status(200).json({

         message:"Blog Published"

      });

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};


// =====================================
// DELETE BLOG
// =====================================

exports.deleteBlog = async(req,res)=>{

   try{

      const blog =
      await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({

            message:"Blog Not Found"

         });

      }

      // AUTHOR SECURITY

      if(

         req.user.role === "AUTHOR"

         &&

         blog.author.toString() !==
         req.user.id

      ){

         return res.status(403).json({

            message:"Access Denied"

         });

      }

      await Blog.findByIdAndDelete(

         req.params.id

      );

      res.status(200).json({

         message:"Blog Deleted"

      });

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};