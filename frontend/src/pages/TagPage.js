import {
   useEffect,
   useState
} from "react";

import {
   useParams
} from "react-router-dom";

import API from "../services/api";

import Navbar from
"../components/Navbar";

import Footer from
"../components/Footer";

import BlogCard from
"../components/BlogCard";

import Loader from
"../components/Loader";

import EmptyState from
"../components/EmptyState";

function TagPage(){

   const { name } =
   useParams();

   const [blogs,setBlogs] =
   useState([]);

   const [loading,setLoading] =
   useState(true);

   useEffect(()=>{

      fetchBlogs();

   },[name]);

   const fetchBlogs =
   async()=>{

      try{

         setLoading(true);

         const res =
         await API.get("/blogs");

         const filtered =
         res.data.filter((blog)=>

            blog.tags
            ?.join(" ")
            .toLowerCase()
            .includes(
               name.toLowerCase()
            )

         );

         setBlogs(filtered);

      }

      catch(error){

         console.log(error);

      }

      finally{

         setLoading(false);

      }

   };

   return(

      <div className="bg-[#f5f7fb] min-h-screen">

         <Navbar />

         {/* HERO */}

         <section className="pt-28 pb-20">

            <div className="max-w-7xl mx-auto px-6">

               <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-[40px] p-10 md:p-16 text-white shadow-2xl">

                  {/* BADGE */}

                  <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full text-sm font-semibold mb-8">

                     🏷 Trending Tag

                  </div>

                  {/* TITLE */}

                  <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">

                     #{name}
                  </h1>

                  {/* DESC */}

                  <p className="text-xl text-pink-100 leading-10 max-w-3xl">

                     Discover all blogs, tutorials, and insights tagged with{" "}

                     <span className="font-bold text-white">

                        #{name}

                     </span>

                     .

                  </p>

                  {/* STATS */}

                  <div className="flex flex-wrap gap-6 mt-10">

                     <div className="bg-white/15 backdrop-blur-md px-8 py-5 rounded-3xl">

                        <p className="text-pink-100 text-sm mb-2">

                           Tagged Articles

                        </p>

                        <h2 className="text-4xl font-black">

                           {blogs.length}

                        </h2>

                     </div>

                     <div className="bg-white/15 backdrop-blur-md px-8 py-5 rounded-3xl">

                        <p className="text-pink-100 text-sm mb-2">

                           Current Tag

                        </p>

                        <h2 className="text-2xl font-bold">

                           #{name}
                        </h2>

                     </div>

                  </div>

               </div>

            </div>

         </section>

         {/* BLOGS */}

         <section className="pb-24">

            <div className="max-w-7xl mx-auto px-6">

               {

                  loading

                  ?

                  <Loader />

                  :

                  blogs.length===0

                  ?

                  <EmptyState />

                  :

                  <>

                     {/* HEADING */}

                     <div className="mb-14">

                        <h2 className="text-4xl font-bold text-gray-900 mb-3">

                           Latest Tagged Blogs

                        </h2>

                        <p className="text-gray-500 text-lg">

                           Curated content related to #{name}

                        </p>

                     </div>

                     {/* GRID */}

                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

                        {

                           blogs.map((blog)=>(

                              <BlogCard

                                 key={blog._id}

                                 blog={blog}

                              />

                           ))

                        }

                     </div>

                  </>

               }

            </div>

         </section>

         <Footer />

      </div>

   );

}

export default TagPage;