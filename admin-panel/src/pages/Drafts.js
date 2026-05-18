import {

   useEffect,
   useState

} from "react";

import axios from "axios";

import {

   Link

} from "react-router-dom";

function Drafts(){

   const [drafts,setDrafts] =
   useState([]);

   const [search,setSearch] =
   useState("");

   const token =
   localStorage.getItem("token");

   useEffect(()=>{

      fetchDrafts();

   },[]);

   // FETCH DRAFTS

   const fetchDrafts = async()=>{

      try{

         const { data } =
         await axios.get(

            "http://localhost:5000/api/blogs/drafts",

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`

               }

            }

         );

         setDrafts(data);

      }

      catch(error){

         console.log(error);

      }

   };

   // PUBLISH BLOG

   const publishBlog = async(id)=>{

      try{

         await axios.put(

            `http://localhost:5000/api/blogs/publish/${id}`,

            {},

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`

               }

            }

         );

         alert(
            "Blog Published Successfully"
         );

         fetchDrafts();

      }

      catch(error){

         console.log(error);

      }

   };

   // DELETE BLOG

   const deleteBlog = async(id)=>{

      const confirmDelete =
      window.confirm(

         "Delete this draft blog?"

      );

      if(!confirmDelete){

         return;

      }

      try{

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
            "Draft Deleted Successfully"
         );

         fetchDrafts();

      }

      catch(error){

         console.log(error);

      }

   };

   // SEARCH FILTER

   const filteredDrafts =
   drafts.filter((blog)=>

      blog.title
      ?.toLowerCase()
      .includes(

         search.toLowerCase()

      )

   );

   return(

      <div className="min-h-screen bg-gray-100 p-8">

         {/* HEADER */}

         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

            <div>

               <h1 className="text-4xl font-bold text-gray-900">

                  Draft Blogs

               </h1>

               <p className="text-gray-500 mt-2">

                  Total Drafts:
                  {" "}
                  {drafts.length}

               </p>

            </div>

            {/* SEARCH */}

            <div className="mt-4 md:mt-0">

               <input

                  type="text"

                  placeholder="Search drafts..."

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

         {/* EMPTY STATE */}

         {

            filteredDrafts.length === 0

            &&

            (

               <div className="bg-white rounded-3xl shadow-md p-16 text-center">

                  <h2 className="text-3xl font-bold text-gray-800 mb-4">

                     No Draft Blogs Found

                  </h2>

                  <p className="text-gray-500 text-lg">

                     Start creating new blogs to save drafts here.

                  </p>

               </div>

            )

         }

         {/* DRAFT LIST */}

         <div className="space-y-5">

            {

               filteredDrafts.map((blog,index)=>(

                  <div

                     key={index}

                     className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6"

                  >

                     {/* LEFT */}

                     <div className="flex gap-5">

                        {

                           blog.featureImage

                           &&

                           (

                              <img

                                 src={blog.featureImage}

                                 alt={blog.title}

                                 className="w-36 h-28 object-cover rounded-2xl"

                              />

                           )

                        }

                        <div>

                           <h2 className="text-2xl font-bold text-gray-900 mb-2">

                              {blog.title}

                           </h2>

                           <p className="text-gray-500 mb-3 leading-7">

                              {

                                 blog.metaDescription
                                 ?.substring(0,100)

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

                           <div className="mt-3 flex flex-wrap gap-3">

                              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">

                                 Draft

                              </span>

                              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">

                                 {

                                    new Date(

                                       blog.createdAt

                                    ).toLocaleDateString()

                                 }

                              </span>

                           </div>

                        </div>

                     </div>

                     {/* RIGHT BUTTONS */}

                     <div className="flex flex-wrap gap-3">

                        {/* READ */}

                        <Link

                           to={`/blogs/${blog.slug}`}

                           className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"

                        >

                           Read Full Blog

                        </Link>

                        {/* EDIT */}

                        <Link

                           to={`/edit-blog/${blog._id}`}

                           className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-5 py-3 rounded-xl font-semibold transition"

                        >

                           Edit Draft

                        </Link>

                        {/* PUBLISH */}

                        <button

                           onClick={()=>

                              publishBlog(
                                 blog._id
                              )

                           }

                           className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"

                        >

                           Publish

                        </button>

                        {/* DELETE */}

                        <button

                           onClick={()=>

                              deleteBlog(
                                 blog._id
                              )

                           }

                           className="border border-red-400 text-red-500 hover:bg-red-50 px-5 py-3 rounded-xl font-semibold transition"

                        >

                           Delete

                        </button>

                     </div>

                  </div>

               ))

            }

         </div>

      </div>

   );

}

export default Drafts;