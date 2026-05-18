import {
   useEffect,
   useState
} from "react";

import API from "../services/api";

import Navbar from
"../components/Navbar";

import Hero from
"../components/Hero";

import BlogCard from
"../components/BlogCard";

import Footer from
"../components/Footer";

import Loader from
"../components/Loader";

import EmptyState from
"../components/EmptyState";

import SearchBar from
"../components/SearchBar";

import Pagination from
"../components/Pagination";

import TrendingBlogs from
"../components/TrendingBlogs";

function Home(){

   const [blogs,setBlogs] =
   useState([]);

   const [filteredBlogs,
      setFilteredBlogs] =
   useState([]);

   const [loading,setLoading] =
   useState(true);

   const [searchTerm,
      setSearchTerm] =
   useState("");

   const [currentPage,
      setCurrentPage] =
   useState(1);

   const blogsPerPage = 6;

   useEffect(()=>{

      fetchBlogs();

   },[]);

   useEffect(()=>{

      handleSearch();

   },[searchTerm,blogs]);

   // FETCH BLOGS

   const fetchBlogs =
   async()=>{

      try{

         setLoading(true);

         const res =
         await API.get("/blogs");

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

   // SEARCH

   const handleSearch = ()=>{

      const filtered =
      blogs.filter((blog)=>{

         const title =
         blog.title
         ?.toLowerCase()
         .includes(
            searchTerm.toLowerCase()
         );

         const tags =
         blog.tags
         ?.join(" ")
         .toLowerCase()
         .includes(
            searchTerm.toLowerCase()
         );

         const categories =
         blog.categories
         ?.join(" ")
         .toLowerCase()
         .includes(
            searchTerm.toLowerCase()
         );

         return(

            title

            ||

            tags

            ||

            categories

         );

      });

      setFilteredBlogs(filtered);

      setCurrentPage(1);

   };

   // PAGINATION

   const indexOfLastBlog =
   currentPage * blogsPerPage;

   const indexOfFirstBlog =
   indexOfLastBlog - blogsPerPage;

   const currentBlogs =
   filteredBlogs.slice(

      indexOfFirstBlog,

      indexOfLastBlog

   );

   const totalPages =
   Math.ceil(

      filteredBlogs.length
      / blogsPerPage

   );

   return(

      <div className="bg-[#f5f7fb] min-h-screen">

         <Navbar />

         <Hero />

         {/* MAIN */}

         <div className="max-w-7xl mx-auto px-6 py-16">

            {/* SEARCH */}

            <div className="mb-20">

               <div className="text-center mb-10">

                  <h2 className="text-5xl font-bold text-gray-900 mb-5">

                     Explore Blogs

                  </h2>

                  <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-9">

                     Discover premium articles, tutorials, and developer insights from the community.

                  </p>

               </div>

               <SearchBar

                  searchTerm={searchTerm}

                  setSearchTerm={setSearchTerm}

               />

            </div>

            {

               loading

               ?

               <Loader />

               :

               filteredBlogs.length===0

               ?

               <EmptyState />

               :

               <div className="grid lg:grid-cols-3 gap-10">

                  {/* BLOGS */}

                  <div className="lg:col-span-2">

                     {/* HEADING */}

                     <div className="mb-10">

                        <h2 className="text-4xl font-bold text-gray-900 mb-3">

                           Latest Blogs

                        </h2>

                        <p className="text-gray-500 text-lg">

                           Fresh content curated for developers.

                        </p>

                     </div>

                     {/* BLOG GRID */}

                     <div className="grid md:grid-cols-2 gap-10">

                        {

                           currentBlogs.map((blog)=>(

                              <BlogCard

                                 key={blog._id}

                                 blog={blog}

                              />

                           ))

                        }

                     </div>
                     

                     {/* PAGINATION */}

                     <div className="mt-16">

                        <Pagination

                           currentPage={currentPage}

                           totalPages={totalPages}

                           setCurrentPage={setCurrentPage}

                        />

                     </div>

                  </div>

                  {/* SIDEBAR */}

                  <div className="space-y-10">

                     {/* TRENDING */}

                     <TrendingBlogs

                        blogs={blogs}

                     />

                     {/* STATS CARD */}

                     <div className="bg-white rounded-[35px] p-8 shadow-lg border border-gray-100">

                        <h2 className="text-3xl font-bold mb-8">

                           Platform Stats

                        </h2>

                        <div className="space-y-6">

                           <div className="flex items-center justify-between">

                              <span className="text-gray-600">

                                 Total Blogs

                              </span>

                              <span className="font-bold text-2xl text-indigo-600">

                                 {

                                    blogs.length

                                 }

                              </span>

                           </div>

                           <div className="flex items-center justify-between">

                              <span className="text-gray-600">

                                 Categories

                              </span>

                              <span className="font-bold text-2xl text-pink-600">

                                 {

                                    [

                                       ...new Set(

                                          blogs.flatMap(

                                             (blog)=>

                                             blog.categories

                                             ||

                                             []

                                          )

                                       )

                                    ].length

                                 }

                              </span>

                           </div>

                           <div className="flex items-center justify-between">

                              <span className="text-gray-600">

                                 Tags

                              </span>

                              <span className="font-bold text-2xl text-purple-600">

                                 {

                                    [

                                       ...new Set(

                                          blogs.flatMap(

                                             (blog)=>

                                             blog.tags

                                             ||

                                             []

                                          )

                                       )

                                    ].length

                                 }

                              </span>

                           </div>

                        </div>

                     </div>

                     {/* NEWSLETTER */}

                     <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-[35px] p-10 text-white shadow-2xl">

                        <h2 className="text-3xl font-bold mb-5 leading-tight">

                           Join Our Developer Newsletter

                        </h2>

                        <p className="text-indigo-100 leading-8 mb-8">

                           Get weekly developer insights, tutorials, and premium content directly in your inbox.

                        </p>

                        <div className="space-y-4">

                           <input

                              type="email"

                              placeholder="Enter your email"

                              className="w-full rounded-2xl px-5 py-4 text-black outline-none"

                           />

                           <button

                              className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition"

                           >

                              Subscribe Now

                           </button>

                        </div>

                     </div>

                  </div>

               </div>

            }

         </div>

         <Footer />

      </div>

   );

}

export default Home;