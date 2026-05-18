const Blog = require("../models/Blog");

const slugify = require("slugify");

exports.createBlog = async(req,res)=>{

   try{

      const slug = slugify(

         req.body.title,

         {
            lower:true
         }

      );

      const blog = await Blog.create({

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
         req.files?.featureImage?.[0]?.path ||

         "",

         ogImage:
         req.files?.ogImage?.[0]?.path ||

         "",

         tags:

         Array.isArray(req.body.tags)

         ? req.body.tags

         : req.body.tags
         ?.split(","),

         categories:

         Array.isArray(req.body.categories)

         ? req.body.categories

         : req.body.categories
         ?.split(","),

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

         ? req.body.internalLinks

         : req.body.internalLinks
         ?.split(","),

         externalLinks:

         Array.isArray(
            req.body.externalLinks
         )

         ? req.body.externalLinks

         : req.body.externalLinks
         ?.split(","),

         status:req.body.status,

         author:req.user.id

      });

      res.status(201).json({

         message:"Blog Created",

         blog

      });

   }catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};

exports.getBlogs = async(req,res)=>{

   try{

      const blogs = await Blog.find({

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

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};

exports.getDraftBlogs = async(req,res)=>{

   try{

      let query = {

         status:"draft"

      };

      if(req.user.role === "AUTHOR"){

         query.author =
         req.user.id;

      }

      if(req.user.role === "VIEWER"){

         return res.status(403).json({

            message:"Access Denied"

         });

      }

      const blogs = await Blog.find(query)

      .populate(

         "author",

         "name email role"

      )

      .sort({

         createdAt:-1

      });

      res.status(200).json(blogs);

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};

exports.getBlogBySlug = async(req,res)=>{

   try{

      const blog = await Blog.findOne({

         slug:req.params.slug

      }).populate(

         "author",

         "name email role"

      );

      if(!blog){

         return res.status(404).json({

            message:"Blog Not Found"

         });

      }

      res.status(200).json(blog);

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};

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

      res.status(200).json(blog);

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};


exports.updateBlog = async(req,res)=>{

   try{

      const blog = await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({

            message:"Blog Not Found"

         });

      }

      if(

         req.user.role === "AUTHOR" &&

         blog.author.toString() !==
         req.user.id

      ){

         return res.status(403).json({

            message:"Access Denied"

         });

      }

      blog.title =
      req.body.title;

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

      ? req.body.tags

      : req.body.tags
      ?.split(",");

      blog.categories =

      Array.isArray(req.body.categories)

      ? req.body.categories

      : req.body.categories
      ?.split(",");

      blog.internalLinks =

      Array.isArray(
         req.body.internalLinks
      )

      ? req.body.internalLinks

      : req.body.internalLinks
      ?.split(",");

      blog.externalLinks =

      Array.isArray(
         req.body.externalLinks
      )

      ? req.body.externalLinks

      : req.body.externalLinks
      ?.split(",");

      blog.faq = [

         {

            question:
            req.body.faqQuestion,

            answer:
            req.body.faqAnswer

         }

      ];

      if(

         req.files?.featureImage?.[0]
      ){

         blog.featureImage =

         req.files
         .featureImage[0]
         .path;

      }

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

   }catch(error){

      console.log(error);

      res.status(500).json({

         message:error.message

      });

   }

};

exports.publishBlog = async(req,res)=>{

   try{

      const blog = await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({

            message:"Blog Not Found"

         });

      }

      if(

         req.user.role === "AUTHOR" &&

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

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};

exports.deleteBlog = async(req,res)=>{

   try{

      const blog = await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({

            message:"Blog Not Found"

         });

      }

      if(

         req.user.role === "AUTHOR" &&

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

   }catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};