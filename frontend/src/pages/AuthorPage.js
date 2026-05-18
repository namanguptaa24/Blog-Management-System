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

import {

   User,
   Search

} from "lucide-react";

function AuthorPage(){

   const { author } =
   useParams();

   const [blogs,setBlogs] =
   useState([]);

   const [filteredBlogs,setFilteredBlogs] =
   useState([]);

   const [search,setSearch] =
   useState("");

   const [loading,setLoading] =
   useState(true);

   useEffect(()=>{

      fetchBlogs();

   },[author]);

   useEffect(()=>{

      const filtered =
      blogs.filter((blog)=>

         blog.title
         .toLowerCase()
         .includes(
            search.toLowerCase()
         )

      );

      setFilteredBlogs(filtered);

   },[search,blogs]);

   const fetchBlogs =
   async()=>{

      try{

         setLoading(true);

         const res =
         await API.get(

            `/blogs/author/${author}`

         );

         setBlogs(res.data);

         setFilteredBlogs(
            res.data
         );

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

         <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-24 px-6">

            <div className="max-w-7xl mx-auto">

               <div className="flex flex-wrap items-center justify-between gap-10">

                  {/* LEFT */}

                  <div>

                     <div className="flex items-center gap-6 mb-6">

                        {/* AVATAR */}

                        <div className="w-24 h-24 rounded-full bg-white text-indigo-700 flex items-center justify-center text-4xl font-bold shadow-xl">

                           {

                              author
                              ?.charAt(0)
                              ?.toUpperCase()

                           }

                        </div>

                        <div>

                           <p className="uppercase tracking-[4px] text-sm text-indigo-100 mb-2">

                              Blog Author

                           </p>

                           <h1 className="text-5xl md:text-6xl font-bold capitalize">

                              {author}

                           </h1>

                        </div>

                     </div>

                     <p className="text-xl text-indigo-100 max-w-2xl leading-9">

                        Explore all articles written by
                        {" "}
                        <span className="font-bold text-white">

                           {author}

                        </span>

                     </p>

                  </div>

                  {/* STATS */}

                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 min-w-[260px]">

                     <h3 className="text-xl font-semibold mb-3">

                        Published Blogs

                     </h3>

                     <p className="text-6xl font-bold">

                        {

                           filteredBlogs.length

                        }

                     </p>

                  </div>

               </div>

            </div>

         </div>

         {/* CONTENT */}

         <div className="max-w-7xl mx-auto px-6 py-16">

            {/* TOP */}

            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-14">

               <div>

                  <h2 className="text-4xl font-bold text-gray-900 mb-3">

                     Latest Blogs By {author}

                  </h2>

                  <p className="text-gray-500 text-lg">

                     Premium articles from this author.

                  </p>

               </div>

               {/* SEARCH */}

               <div className="relative w-full lg:w-[400px]">

                  <Search

                     className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"

                     size={20}

                  />

                  <input

                     type="text"

                     placeholder={`Search ${author} blogs...`}

                     value={search}

                     onChange={(e)=>

                        setSearch(
                           e.target.value
                        )

                     }

                     className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"

                  />

               </div>

            </div>

            {/* BLOGS */}

            {

               loading

               ?

               <Loader />

               :

               filteredBlogs.length===0

               ?

               <EmptyState />

               :

               <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">

                  {

                     filteredBlogs.map((blog)=>(

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

export default AuthorPage;