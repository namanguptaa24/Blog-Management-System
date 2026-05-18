import {
   useEffect,
   useState
} from "react";

import {
   useParams,
   Link
} from "react-router-dom";

import API from "../services/api";

const parseArray = (data)=>{

   if(!data){

      return [];

   }

   if(Array.isArray(data)){

      return data;

   }

   return String(data)

      .replace(/\[/g,"")
      .replace(/\]/g,"")
      .replace(/"/g,"")

      .split(",")

      .map((item)=>item.trim())

      .filter(Boolean);

};

function BlogDetails(){

   const { slug } =
   useParams();

   const [blog,setBlog] =
   useState(null);

   const [loading,setLoading] =
   useState(true);

   const [scrollProgress,
      setScrollProgress] =
   useState(0);

   useEffect(()=>{

      fetchBlog();

   },[slug]);

   useEffect(()=>{

      const handleScroll = ()=>{

         const totalHeight =

            document.body.scrollHeight
            -
            window.innerHeight;

         const progress =

            (
               window.scrollY
               /
               totalHeight
            ) * 100;

         setScrollProgress(
            progress
         );

      };

      window.addEventListener(
         "scroll",
         handleScroll
      );

      return()=>{

         window.removeEventListener(
            "scroll",
            handleScroll
         );

      };

   },[]);

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

   if(loading){

      return(

         <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] dark:bg-[#0f172a]">

            <div className="text-3xl font-black text-gray-900 dark:text-white">

               Loading...

            </div>

         </div>

      );

   }

   if(!blog){

      return(

         <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] dark:bg-[#0f172a]">

            <div className="text-3xl font-black text-gray-900 dark:text-white">

               Blog Not Found

            </div>

         </div>

      );

   }

   return(

      <div className="bg-[#f5f7fb] dark:bg-[#0f172a] min-h-screen transition overflow-hidden">

         {/* PROGRESS BAR */}

         <div

            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[9999] transition-all duration-200"

            style={{

               width:`${scrollProgress}%`

            }}

         />

         {/* HERO */}

         <section className="relative pt-16 pb-20">

            {/* GLOW */}

            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full"></div>

            <div className="absolute right-0 top-20 w-[500px] h-[500px] bg-pink-500/20 blur-3xl rounded-full"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">

               {/* BACK */}

               <Link

                  to="/"

                  className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline mb-10"

               >

                  ← Back To Home

               </Link>

               {/* IMAGE */}

               {

                  blog.featureImage && (

                     <div className="relative mb-12">

                        <img

                           src={blog.featureImage}

                           alt={blog.title}

                           className="w-full h-[600px] object-cover rounded-[45px] shadow-[0_30px_80px_rgba(0,0,0,0.25)]"

                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-[45px]"></div>

                        {/* HERO CONTENT */}

                        <div className="absolute bottom-0 left-0 p-10 md:p-14">

                          {/* CATEGORIES */}

<div className="flex flex-wrap gap-3 mb-6">

   {

      parseArray(blog.categories)
      ?.map((category,index)=>(

         <Link

            key={index}

            to={`/category/${category}`}

            className="inline-block bg-white/20 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-white/30 transition"

         >

            {category}

         </Link>

      ))

   }

</div>

                           <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.05] max-w-5xl mb-6">

                              {blog.title}

                           </h1>

                           <p className="text-lg md:text-2xl text-white/90 max-w-4xl leading-[1.8]">

                              {

                                 blog.metaDescription

                              }

                           </p>

                        </div>

                     </div>

                  )

               }

               {/* AUTHOR CARD */}

               <div className="bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-[35px] p-8 shadow-xl flex flex-wrap items-center justify-between gap-8">

                  <Link

                     to={`/author/${
                        blog.author?.name
                        ||
                        blog.author
                        ||
                        "Admin"
                     }`}

                     className="flex items-center gap-5"

                  >

                     <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center text-3xl font-black shadow-xl">

                        {

                           (

                              blog.author?.name
                              ||
                              blog.author
                              ||
                              "A"

                           )

                           .charAt(0)
                           .toUpperCase()

                        }

                     </div>

                     <div>

                        <p className="text-2xl font-black text-gray-900 dark:text-white">

                           {

                              blog.author?.name
                              ||
                              blog.author
                              ||
                              "Admin"

                           }

                        </p>

                        <p className="text-gray-500 dark:text-gray-300">

                           Senior Content Author

                        </p>

                     </div>

                  </Link>

                  <div className="flex flex-wrap gap-4">

                     <div className="bg-green-100 text-green-700 px-6 py-3 rounded-full font-bold">

                        {

                           blog.status

                        }

                     </div>

                     <div className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-full font-bold">

                        Tech Article

                     </div>

                  </div>

               </div>

            </div>

         </section>

         {/* CONTENT */}

         <section className="pb-24">

            <div className="max-w-5xl mx-auto px-6">

               {/* ARTICLE */}

               <div className="bg-white dark:bg-[#111827] rounded-[45px] p-8 md:p-16 shadow-[0_20px_70px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700">

                  <div className="flex items-center gap-3 mb-12">

                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                     <h2 className="text-4xl font-black text-gray-900 dark:text-white">

                        Article Content

                     </h2>

                  </div>

                  <div className="text-gray-700 dark:text-gray-300 text-[19px] leading-[2.2] tracking-wide whitespace-pre-wrap">

                     {

                        blog.content

                     }

                  </div>

               </div>

               {/* TAGS */}

               {

                  parseArray(blog.tags).length > 0 && (

                     <div className="mt-14">

                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">

                           Explore Topics

                        </h2>

                        <div className="flex flex-wrap gap-4">

                           {

                              parseArray(blog.tags).map(

                                 (tag,index)=>(

                                    <Link

                                       key={index}

                                       to={`/tag/${tag}`}

                                       className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:-translate-y-1 hover:shadow-xl text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full transition-all duration-300 font-semibold"

                                    >

                                       #{tag}

                                    </Link>

                                 )

                              )

                           }

                        </div>

                     </div>

                  )

               }

               {/* FAQ */}

               {

                  blog.faq &&
                  blog.faq.length > 0 && (

                     <div className="mt-20">

                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-10">

                           Frequently Asked Questions

                        </h2>

                        <div className="space-y-6">

                           {

                              blog.faq.map((faq,index)=>(

                                 <div

                                    key={index}

                                    className="bg-white dark:bg-[#111827] rounded-[30px] p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition"

                                 >

                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-5">

                                       {faq.question}

                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 leading-[2] text-lg">

                                       {faq.answer}

                                    </p>

                                 </div>

                              ))

                           }

                        </div>

                     </div>

                  )

               }

               {/* SEO CARDS */}

               <div className="grid md:grid-cols-2 gap-8 mt-20">

                  {/* SEO */}

                  <div className="bg-white dark:bg-[#111827] rounded-[35px] p-10 shadow-xl border border-gray-100 dark:border-gray-700">

                     <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-10">

                        SEO Metadata

                     </h2>

                     <div className="space-y-8">

                        <div>

                           <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">

                              Meta Title

                           </p>

                           <h3 className="text-xl font-black text-gray-900 dark:text-white">

                              {blog.metaTitle}

                           </h3>

                        </div>

                        <div>

                           <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">

                              Meta Description

                           </p>

                           <p className="text-gray-600 dark:text-gray-300 leading-[2]">

                              {blog.metaDescription}

                           </p>

                        </div>

                        {

                           blog.canonicalUrl && (

                              <div>

                                 <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">

                                    Canonical URL

                                 </p>

                                 <a

                                    href={blog.canonicalUrl}

                                    target="_blank"

                                    rel="noreferrer"

                                    className="text-indigo-600 hover:underline break-all"

                                 >

                                    {blog.canonicalUrl}

                                 </a>

                              </div>

                           )

                        }

                     </div>

                  </div>

                  {/* SOCIAL SEO */}

                  <div className="bg-white dark:bg-[#111827] rounded-[35px] p-10 shadow-xl border border-gray-100 dark:border-gray-700">

                     <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-10">

                        Social SEO Preview

                     </h2>

                     <div className="space-y-8">

                        <div>

                           <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">

                              Open Graph Title

                           </p>

                           <h3 className="text-xl font-black text-gray-900 dark:text-white">

                              {blog.ogTitle}

                           </h3>

                        </div>

                        <div>

                           <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">

                              Open Graph Description

                           </p>

                           <p className="text-gray-600 dark:text-gray-300 leading-[2]">

                              {blog.ogDescription}

                           </p>

                        </div>

                        <div>

                           <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">

                              Twitter Title  

                           </p>

                           <h3 className="text-xl font-black text-gray-900 dark:text-white">

                              {blog.twitterTitle}

                           </h3>

                        </div>

                        <div>

                           <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">

                              Twitter Description

                           </p>

                           <p className="text-gray-600 dark:text-gray-300 leading-[2]">

                              {blog.twitterDescription}

                           </p>

                        </div>

                     </div>

                  </div>

               </div>

               {/* LINKS */}

               <div className="grid md:grid-cols-2 gap-8 mt-14">

                  {/* INTERNAL */}

                  {

                     blog.internalLinks && (

                        <div className="bg-white dark:bg-[#111827] rounded-[35px] p-8 shadow-xl border border-gray-100 dark:border-gray-700">

                           <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">

                              Internal Resources

                           </h2>

                           <div className="space-y-4">

                              {

                                 parseArray(
                                    blog.internalLinks
                                 ).map((link,index)=>(

                                    <a

                                       key={index}

                                       href={link}

                                       target="_blank"

                                       rel="noreferrer"

                                       className="block bg-gray-50 dark:bg-[#1f2937] hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 text-indigo-600 break-all transition"

                                    >

                                       {link}

                                    </a>

                                 ))

                              }

                           </div>

                        </div>

                     )

                  }

                  {/* EXTERNAL */}

                  {

                     blog.externalLinks && (

                        <div className="bg-white dark:bg-[#111827] rounded-[35px] p-8 shadow-xl border border-gray-100 dark:border-gray-700">

                           <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">

                              External Resources

                           </h2>

                           <div className="space-y-4">

                              {

                                 parseArray(
                                    blog.externalLinks
                                 ).map((link,index)=>(

                                    <a

                                       key={index}

                                       href={link}

                                       target="_blank"

                                       rel="noreferrer"

                                       className="block bg-gray-50 dark:bg-[#1f2937] hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 text-indigo-600 break-all transition"

                                    >

                                       {link}

                                    </a>

                                 ))

                              }

                           </div>

                        </div>

                     )

                  }

               </div>

            </div>

         </section>

      </div>

   );

}

export default BlogDetails;