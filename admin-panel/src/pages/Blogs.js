import {

   useEffect,
   useState

} from "react";

import {

   Link

} from "react-router-dom";

import axios from "axios";

function Blogs(){

   // CURRENT USER

   const user = JSON.parse(

      localStorage.getItem("user")

   );

   const [blogs,setBlogs] =
   useState([]);

   const [search,setSearch] =
   useState("");

   useEffect(()=>{

      fetchBlogs();

   },[]);

   // FETCH BLOGS

   const fetchBlogs = async()=>{

      try{

         const { data } =
         await axios.get(

            "http://localhost:5000/api/blogs"

         );

         setBlogs(data);

      }

      catch(error){

         console.log(error);

      }

   };

   // DELETE BLOG

   const deleteBlog = async(id)=>{

      const confirmDelete =
      window.confirm(

         "Are you sure you want to delete this blog?"

      );

      if(!confirmDelete){

         return;

      }

      try{

         const token =
         localStorage.getItem(
            "token"
         );

         await axios.delete(

            `http://localhost:5000/api/blogs/delete/${id}`,

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`

               }

            }

         );

         alert(
            "Blog Deleted Successfully"
         );

         fetchBlogs();

      }

      catch(error){

         console.log(error);

         alert(

            error.response?.data?.message ||

            "Delete Failed"

         );

      }

   };

   // SEARCH FILTER

   const filteredBlogs =
   blogs.filter((blog)=>

      blog.title
         ?.toLowerCase()
         .includes(

            search.toLowerCase()

         )

   );

  // ROLE-BASED ACCESS

const canManageBlog = (blog)=>{

   // SUPER ADMIN
   // CAN MANAGE ALL BLOGS

   if(

      user?.role ===
      "SUPER_ADMIN"

   ){

      return true;

   }

   // EDITOR
   // CAN MANAGE ALL BLOGS

   if(

      user?.role ===
      "EDITOR"

   ){

      return true;

   }

   // AUTHOR
   // ONLY OWN BLOGS

   if(

      user?.role ===
      "AUTHOR"

   ){

      return(

         blog.author?._id ===
         user?._id

      );

   }

   // VIEWER
   // NO ACCESS

   return false;

};

   return(

      <div className="min-h-screen bg-gray-100 p-8">

         {/* HEADER */}

         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

            <div>

               <h1 className="text-4xl font-bold text-gray-900">

                  All Blogs

               </h1>

               <p className="text-gray-500 mt-2">

                  Total Blogs:

                  {" "}

                  {blogs.length}

               </p>

            </div>

            {/* SEARCH */}

            <div className="mt-4 md:mt-0">

               <input

                  type="text"

                  placeholder="Search blogs..."

                  value={search}

                  onChange={(e)=>

                     setSearch(
                        e.target.value
                     )

                  }

                  className="w-full md:w-80 px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"

               />

            </div>

         </div>

         {/* BLOG LIST */}

         <div className="space-y-6">

            {

               filteredBlogs.map((blog,index)=>(

                  <div

                     key={index}

                     className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 hover:shadow-lg transition"

                  >

                     {/* LEFT */}

                     <div className="flex gap-5">

                        {/* IMAGE */}

                        {

                           blog.featureImage

                           &&

                           (

                              <img

                                 src={blog.featureImage}

                                 alt={blog.title}

                                 className="w-36 h-28 object-cover rounded-xl"

                              />

                           )

                        }

                        {/* CONTENT */}

                        <div>

                           <h2 className="text-2xl font-bold text-gray-900 mb-2">

                              {

                                 blog.title

                              }

                           </h2>

                           <p className="text-gray-500 mb-2">

                              {

                                 blog.metaDescription
                                    ?.substring(0,80)

                              }...

                           </p>

                           <p className="text-sm text-gray-600">

                              <span className="font-semibold">

                                 Author:

                              </span>

                              {" "}

                              {

                                 blog.author?.name

                                 ||

                                 "Admin"

                              }

                           </p>

                           <p className="mt-2">

                              <span

                                 className={`

                                    px-3 py-1 rounded-full text-sm font-medium

                                    ${

                                       blog.status === "published"

                                       ?

                                       "bg-green-100 text-green-700"

                                       :

                                       "bg-yellow-100 text-yellow-700"

                                    }

                                 `}

                              >

                                 {

                                    blog.status

                                 }

                              </span>

                           </p>

                        </div>

                     </div>

                     {/* RIGHT BUTTONS */}

                     <div className="flex flex-col gap-3 min-w-[180px]">

                        {/* READ */}

                        <Link

                           to={`/blogs/${blog.slug}`}

                           className="bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 rounded-xl font-semibold transition"

                        >

                           Read Full Blog

                        </Link>

                        {/* EDIT */}

                        {

                           canManageBlog(blog)

                           &&

                           (

                              <Link

                                 to={`/edit-blog/${blog._id}`}

                                 className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 text-center py-3 rounded-xl font-semibold transition"

                              >

                                 Edit

                              </Link>

                           )

                        }

                        {/* DELETE */}

                        {

                           canManageBlog(blog)

                           &&

                           (

                              <button

                                 onClick={()=>

                                    deleteBlog(
                                       blog._id
                                    )

                                 }

                                 className="border border-red-400 text-red-500 hover:bg-red-50 py-3 rounded-xl font-semibold transition"

                              >

                                 Delete

                              </button>

                           )

                        }

                     </div>

                  </div>

               ))

            }

         </div>

      </div>

   );

}

export default Blogs;