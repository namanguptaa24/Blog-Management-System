import {

   useEffect,
   useState

} from "react";

import {

   useSearchParams

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

import {

   Search

} from "lucide-react";

function SearchPage(){

   const [searchParams] =
   useSearchParams();

   const query =
   searchParams.get("q");

   const [blogs,setBlogs] =
   useState([]);

   const [loading,setLoading] =
   useState(true);

   useEffect(()=>{

      fetchBlogs();

   },[query]);

   const fetchBlogs =
   async()=>{

      try{

         setLoading(true);

         const res =
         await API.get("/blogs");

         const filtered =
         res.data.filter((blog)=>{

            const title =
            blog.title
            ?.toLowerCase()
            || "";

            const tags =
            blog.tags
            ?.join(" ")
            ?.toLowerCase()
            || "";

            const categories =
            blog.categories
            ?.join(" ")
            ?.toLowerCase()
            || "";

            return(

               title.includes(
                  query.toLowerCase()
               )

               ||

               tags.includes(
                  query.toLowerCase()
               )

               ||

               categories.includes(
                  query.toLowerCase()
               )

            );

         });

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

         <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-24 px-6 text-white">

            <div className="max-w-7xl mx-auto">

               <div className="flex items-center gap-5 mb-6">

                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">

                     <Search size={34} />

                  </div>

                  <div>

                     <p className="uppercase tracking-[4px] text-sm text-indigo-100">

                        Search Results

                     </p>

                     <h1 className="text-5xl md:text-6xl font-bold">

                        {query}

                     </h1>

                  </div>

               </div>

               <p className="text-xl text-indigo-100">

                  Found
                  {" "}
                  <span className="font-bold text-white">

                     {blogs.length}

                  </span>
                  {" "}
                  blogs matching your search.

               </p>

            </div>

         </div>

         {/* CONTENT */}

         <div className="max-w-7xl mx-auto px-6 py-16">

            {

               loading

               ?

               <Loader />

               :

               blogs.length===0

               ?

               <EmptyState />

               :

               <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">

                  {

                     blogs.map((blog)=>(

                        <BlogCard

                           key={blog._id}

                           blog={blog}

                        />

                     ))

                  }

               </div>

            }

         </div>

         <Footer />

      </div>

   );

}

export default SearchPage;