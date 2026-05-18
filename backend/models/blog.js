const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({

   question:{
      type:String
   },

   answer:{
      type:String
   }

});

const blogSchema =
new mongoose.Schema({

   title:{
      type:String,
      required:true
   },

   slug:{
      type:String,
      required:true,
      unique:true
   },

   content:{
      type:String,
      required:true
   },

   metaTitle:{
      type:String
   },

   metaDescription:{
      type:String
   },

   canonicalUrl:{
      type:String
   },

   featureImage:{
      type:String
   },

   ogTitle:{
      type:String
   },

   ogDescription:{
      type:String
   },

   ogImage:{
      type:String
   },

   twitterTitle:{
      type:String
   },

   twitterDescription:{
      type:String
   },

   tags:[
      String
   ],

   categories:[
      String
   ],

   faq:[
      faqSchema
   ],

   internalLinks:[
      String
   ],

   externalLinks:[
      String
   ],

   status:{
      type:String,

      enum:[
         "draft",
         "published"
      ],

      default:"draft"
   },

   author:{

      type:
      mongoose.Schema.Types.ObjectId,

      ref:"User"

   }

},

{
   timestamps:true
}

);

module.exports =
mongoose.model(
   "Blog",
   blogSchema
);