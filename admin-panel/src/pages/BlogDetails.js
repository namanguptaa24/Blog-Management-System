import {

   useEffect,
   useState

} from "react";

import {

   useParams,
   Link

} from "react-router-dom";

import API from "../services/api";

import {

   Calendar,
   Tag,
   ArrowLeft

} from "lucide-react";

function BlogDetails(){

   const { slug } =
   useParams();

   const [blog,setBlog] =
   useState(null);

   const [loading,setLoading] =
   useState(true);

   useEffect(()=>{

      fetchBlog();

   },[slug]);

   const fetchBlog = async()=>{

      try{

         const res =
         await API.get(

            `/blogs/${slug}`

         );

         setBlog(res.data);

      }

      catch(error){

         console.log(error);

      }

      finally{

         setLoading(false);

      }

   };

   const cleanArrayData = (data)=>{

      if(!data){

         return [];

      }

      return data.flatMap((item)=>{

         if(typeof item === "string"){

            return item

            .replace("[","")

            .replace("]","")

            .replaceAll('"',"")

            .split(",");

         }

         return item;

      });

   };

   // LOADING

   if(loading){

      return(

         <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">

            <div className="text-center">

               <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

               <h2 className="text-2xl font-bold text-gray-700">

                  Loading Blog...

               </h2>

            </div>

         </div>

      );

   }

   // BLOG NOT FOUND

   if(!blog){

      return(

         <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">

            <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

               <h1 className="text-4xl font-bold mb-4">

                  Blog Not Found

               </h1>

               <Link

                  to="/blogs"

                  className="inline-block mt-5 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold"

               >

                  Back To Blogs

               </Link>

            </div>

         </div>

      );

   }

   return(

      <div className="min-h-screen bg-[#f5f7fb] py-10 px-4">

         <div className="max-w-6xl mx-auto">

            {/* BACK */}

            <Link

               to="/blogs"

               className="inline-flex items-center gap-3 text-indigo-600 font-semibold mb-8 hover:text-indigo-800 transition"

            >

               <ArrowLeft size={20} />

               Back To Blogs

            </Link>

            {/* MAIN CARD */}

            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">

               {/* FEATURE IMAGE */}

               {

                  blog.featureImage

                  &&

                  (

                     <div className="relative h-[500px] overflow-hidden">

                        <img

                           src={blog.featureImage}

                           alt={blog.title}

                           className="w-full h-full object-cover"

                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                        {/* HERO CONTENT */}

                        <div className="absolute bottom-0 left-0 p-10 text-white w-full">

                           {/* CATEGORIES */}

                           {

                              cleanArrayData(blog.categories)

                              ?.length > 0

                              &&

                              (

                                 <div className="flex flex-wrap gap-3 mb-5">

                                    {

                                       cleanArrayData(blog.categories)

                                       .map((category,index)=>(

                                          <span

                                             key={index}

                                             className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold"

                                          >

                                             {category.trim()}

                                          </span>

                                       ))

                                    }

                                 </div>

                              )

                           }

                           {/* TITLE */}

                           <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">

                              {blog.title}

                           </h1>

                           {/* AUTHOR */}

                           <div className="flex flex-wrap items-center gap-6">

                              <div>

                                 <p className="font-semibold text-lg">

                                    {

                                       blog.author?.name

                                       ||

                                       "Admin"

                                    }

                                 </p>

                              </div>

                              <div className="flex items-center gap-2 text-gray-200">

                                 <Calendar size={18} />

                                 {

                                    new Date(

                                       blog.createdAt

                                    ).toDateString()

                                 }

                              </div>

                           </div>

                        </div>

                     </div>

                  )

               }

               {/* CONTENT */}

               <div className="p-8 md:p-14">

                  {/* STATUS */}

                  <div className="flex flex-wrap items-center gap-4 mb-10">

                     <span className={`px-5 py-2 rounded-full text-sm font-bold

                        ${

                           blog.status === "published"

                           ?

                           "bg-green-100 text-green-700"

                           :

                           "bg-yellow-100 text-yellow-700"

                        }

                     `}>

                        {

                           blog.status === "published"

                           ?

                           "Published"

                           :

                           "Draft"

                        }

                     </span>

                     <span className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-sm font-semibold">

                        SEO Optimized

                     </span>

                  </div>

                  {/* META DESCRIPTION */}

                  {

                     blog.metaDescription

                     &&

                     (

                        <div className="bg-[#f8f9ff] border border-indigo-100 rounded-3xl p-8 mb-12">

                           <h2 className="text-2xl font-bold mb-4">

                              Meta Description

                           </h2>

                           <p className="text-gray-700 text-lg leading-9">

                              {

                                 blog.metaDescription

                              }

                           </p>

                        </div>

                     )

                  }

                  {/* CONTENT */}

                  <div className="mb-14">

                     <h2 className="text-4xl font-bold mb-8">

                        Blog Content

                     </h2>

                     <div className="text-gray-700 text-lg leading-10 whitespace-pre-wrap">

                        {

                           blog.content

                        }

                     </div>

                  </div>

                  {/* TAGS */}

                  {

                     cleanArrayData(blog.tags)

                     ?.length > 0

                     &&

                     (

                        <div className="mb-14">

                           <div className="flex items-center gap-3 mb-6">

                              <Tag className="text-indigo-600" />

                              <h2 className="text-3xl font-bold">

                                 Tags

                              </h2>

                           </div>

                           <div className="flex flex-wrap gap-4">

                              {

                                 cleanArrayData(blog.tags)

                                 .map((tag,index)=>(

                                    <Link

                                       key={index}

                                       to={`/tag/${tag.trim()}`}

                                       className="bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 transition px-5 py-3 rounded-full font-medium"

                                    >

                                       #{tag.trim()}

                                    </Link>

                                 ))

                              }

                           </div>

                        </div>

                     )

                  }
{/* META TITLE */}

{
   blog.metaTitle
   &&
   (
      <div className="mb-14">

         <h2 className="text-3xl font-bold mb-5">

            Meta Title

         </h2>

         <div className="bg-[#f8f9ff] border border-indigo-100 rounded-3xl p-8">

            <p className="text-lg text-gray-700">

               {blog.metaTitle}

            </p>

         </div>

      </div>
   )
}

{/* CANONICAL URL */}

{
   blog.canonicalUrl
   &&
   (
      <div className="mb-14">

         <h2 className="text-3xl font-bold mb-5">

            Canonical URL

         </h2>

         <a

            href={blog.canonicalUrl}

            target="_blank"

            rel="noreferrer"

            className="text-indigo-600 text-lg break-all hover:underline"

         >

            {blog.canonicalUrl}

         </a>

      </div>
   )
}

{/* FAQ */}

{
   blog.faqQuestion
   &&
   (
      <div className="mb-14">

         <h2 className="text-3xl font-bold mb-6">

            FAQ

         </h2>

         <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8">

            <h3 className="text-2xl font-bold mb-4">

               {blog.faqQuestion}

            </h3>

            <p className="text-lg text-gray-700 leading-9">

               {blog.faqAnswer}

            </p>

         </div>

      </div>
   )
}

{/* SEO SECTION */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">

   {/* OPEN GRAPH SEO */}

   <div className="bg-[#f8f9ff] rounded-3xl p-8 border border-gray-100">

      <h2 className="text-2xl font-bold mb-6">

         Open Graph SEO

      </h2>

      <div className="space-y-5">

         <div>

            <p className="font-semibold text-gray-900 mb-2">

               OG Title

            </p>

            <p className="text-gray-600">

               {blog.ogTitle || "N/A"}

            </p>

         </div>

         <div>

            <p className="font-semibold text-gray-900 mb-2">

               OG Description

            </p>

            <p className="text-gray-600">

               {blog.ogDescription || "N/A"}

            </p>

         </div>

         {

            blog.ogImage

            &&

            (
               <img

                  src={blog.ogImage}

                  alt="OG"

                  className="w-full h-60 object-cover rounded-2xl mt-5"

               />
            )
         }

      </div>

   </div>

   {/* TWITTER SEO */}

   <div className="bg-[#f8f9ff] rounded-3xl p-8 border border-gray-100">

      <h2 className="text-2xl font-bold mb-6">

         Twitter SEO

      </h2>

      <div className="space-y-5">

         <div>

            <p className="font-semibold text-gray-900 mb-2">

               Twitter Title

            </p>

            <p className="text-gray-600">

               {blog.twitterTitle || "N/A"}

            </p>

         </div>

         <div>

            <p className="font-semibold text-gray-900 mb-2">

               Twitter Description

            </p>

            <p className="text-gray-600">

               {blog.twitterDescription || "N/A"}

            </p>

         </div>

      </div>

   </div>

</div>

{/* INTERNAL + EXTERNAL LINKS */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

   {

      blog.internalLinks

      &&

      (
         <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-5">

               Internal Links

            </h2>

            <p className="text-gray-700 leading-8 break-all">

               {blog.internalLinks}

            </p>

         </div>
      )
   }

   {

      blog.externalLinks

      &&

      (
         <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-5">

               External Links

            </h2>

            <p className="text-gray-700 leading-8 break-all">

               {blog.externalLinks}

            </p>

         </div>
      )
   }

</div>
               </div>

            </div>

         </div>

      </div>

   );

}

export default BlogDetails;