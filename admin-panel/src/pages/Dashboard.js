import {

   useEffect,
   useState

} from "react";

import {

   Link

} from "react-router-dom";

import axios from "axios";

import {

   FaBlog,
   FaFileAlt,
   FaUsers,
   FaPenNib

} from "react-icons/fa";

function Dashboard(){

   const user = JSON.parse(

      localStorage.getItem("user")

   );

   const [blogs,setBlogs] =
   useState([]);

   const [drafts,setDrafts] =
   useState([]);

   const [users,setUsers] =
   useState([]);

   const [publishedCount,
   setPublishedCount] =
   useState(0);

   // FETCH BLOGS

   const fetchBlogs = async()=>{

      try{

         const { data } =
         await axios.get(

            "http://localhost:5000/api/blogs"

         );

         setBlogs(data);

         setPublishedCount(

            data.filter(

               (blog)=>

               blog.status ===
               "published"

            ).length

         );

      }

      catch(error){

         console.log(error);

      }

   };

   // FETCH DRAFTS

   const fetchDrafts = async()=>{

      try{

         const token =
         localStorage.getItem(
            "token"
         );

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

   // FETCH USERS

   const fetchUsers = async()=>{

      try{

         const token =
         localStorage.getItem(
            "token"
         );

         const { data } =
         await axios.get(

            "http://localhost:5000/api/users",

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`

               }

            }

         );

         setUsers(data);

      }

      catch(error){

         console.log(error);

      }

   };

   useEffect(()=>{

      fetchBlogs();

      fetchDrafts();

      if(

         user?.role ===
         "SUPER_ADMIN"

      ){

         fetchUsers();

      }

   },[]);

   return(

      <div className="space-y-10">

         {/* HEADER */}

         <div className="flex items-center justify-between">

            <div>

               <h1 className="text-5xl font-bold text-gray-900">

                  Dashboard

               </h1>

               <p className="text-gray-500 mt-2 text-lg">

                  {/* Welcome to your Blog CMS Admin Panel */}

               </p>

            </div>

            {/* USER CARD */}

            <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow">

               <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">

                  {

                     user?.name?.charAt(0)

                  }

               </div>

               <div>

                  <h3 className="font-bold text-gray-900">

                     {user?.name}

                  </h3>

                  <p className="text-sm text-gray-500">

                     {user?.role}

                  </p>

               </div>

            </div>

         </div>

         {/* STATS */}

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* TOTAL BLOGS */}

            <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition">

               <div className="flex items-center justify-between">

                  <div>

                     <p className="text-gray-500">

                        Total Blogs

                     </p>

                     <h2 className="text-5xl font-bold mt-3">

                        {blogs.length}

                     </h2>

                  </div>

                  <div className="bg-purple-100 text-purple-600 p-5 rounded-2xl text-3xl">

                     <FaBlog />

                  </div>

               </div>

               <Link

                  to="/blogs"

                  className="text-sm text-purple-600 font-semibold mt-5 inline-block"

               >

                  View all blogs

               </Link>

            </div>

            {/* PUBLISHED */}

            <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition">

               <div className="flex items-center justify-between">

                  <div>

                     <p className="text-gray-500">

                        Published Blogs

                     </p>

                     <h2 className="text-5xl font-bold mt-3">

                        {publishedCount}

                     </h2>

                  </div>

                  <div className="bg-green-100 text-green-600 p-5 rounded-2xl text-3xl">

                     <FaFileAlt />

                  </div>

               </div>

               <Link

                  to="/blogs"

                  className="text-sm text-green-600 font-semibold mt-5 inline-block"

               >

                  View published

               </Link>

            </div>

            {/* DRAFTS */}

            <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition">

               <div className="flex items-center justify-between">

                  <div>

                     <p className="text-gray-500">

                        Draft Blogs

                     </p>

                     <h2 className="text-5xl font-bold mt-3">

                        {drafts.length}

                     </h2>

                  </div>

                  <div className="bg-yellow-100 text-yellow-600 p-5 rounded-2xl text-3xl">

                     <FaPenNib />

                  </div>

               </div>

               <Link

                  to="/drafts"

                  className="text-sm text-yellow-600 font-semibold mt-5 inline-block"

               >

                  View drafts

               </Link>

            </div>

            {/* USERS */}

            {

               user?.role ===
               "SUPER_ADMIN"

               &&

               (

                  <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition">

                     <div className="flex items-center justify-between">

                        <div>

                           <p className="text-gray-500">

                              Total Users

                           </p>

                           <h2 className="text-5xl font-bold mt-3">

                              {users.length}

                           </h2>

                        </div>

                        <div className="bg-blue-100 text-blue-600 p-5 rounded-2xl text-3xl">

                           <FaUsers />

                        </div>

                     </div>

                     <Link

                        to="/users"

                        className="text-sm text-blue-600 font-semibold mt-5 inline-block"

                     >

                        Manage users

                     </Link>

                  </div>

               )

            }

         </div>

         {/* RECENT BLOGS */}

         <div className="bg-white rounded-3xl shadow-md overflow-hidden">

            <div className="flex items-center justify-between p-6 border-b">

               <h2 className="text-2xl font-bold">

                  Recent Blogs

               </h2>

               <Link

                  to="/blogs"

                  className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-semibold"

               >

                  View all

               </Link>

            </div>

            <div className="overflow-x-auto">

               <table className="w-full">

                  <thead className="bg-gray-50">

                     <tr>

                        <th className="text-left p-5">

                           Title

                        </th>

                        <th className="text-left p-5">

                           Author

                        </th>

                        <th className="text-left p-5">

                           Status

                        </th>

                        <th className="text-left p-5">

                           Date

                        </th>

                     </tr>

                  </thead>

                  <tbody>

                     {

                        blogs.slice(0,5).map((blog,index)=>(

                           <tr

                              key={index}

                              className="border-t hover:bg-gray-50 transition"

                           >

                              <td className="p-5 font-semibold">

                                 {blog.title}

                              </td>

                              <td className="p-5">

                                 {

                                    blog.author?.name

                                    ||

                                    "Admin"

                                 }

                              </td>

                              <td className="p-5">

                                 <span

                                    className={`

                                       px-4 py-1 rounded-full text-sm font-semibold

                                       ${

                                          blog.status === "published"

                                          ?

                                          "bg-green-100 text-green-700"

                                          :

                                          "bg-yellow-100 text-yellow-700"

                                       }

                                    `}

                                 >

                                    {blog.status}

                                 </span>

                              </td>

                              <td className="p-5 text-gray-500">

                                 {

                                    new Date(

                                       blog.createdAt

                                    ).toLocaleDateString()

                                 }

                              </td>

                           </tr>

                        ))

                     }

                  </tbody>

               </table>

            </div>

         </div>

      </div>

   );

}

export default Dashboard;