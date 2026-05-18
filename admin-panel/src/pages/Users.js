import {

   useEffect,
   useState

} from "react";

import API from "../services/api";

import Loader from "../components/Loader";

import ErrorMessage from "../components/ErrorMessage";

function Users(){

   const [users,setUsers] =
   useState([]);

   const [loading,setLoading] =
   useState(true);

   const [error,setError] =
   useState("");

   const currentUser =
   JSON.parse(

      localStorage.getItem(
         "user"
      )

   );

   useEffect(()=>{

      fetchUsers();

   },[]);

   const fetchUsers =
   async()=>{

      try{

         setError("");

         const token =
         localStorage.getItem(
            "token"
         );

         const res =
         await API.get(

            "/users",

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`

               }

            }

         );

         setUsers(res.data);

      }catch(error){

         console.log(error);

         setError(

            error.response?.data?.message ||

            "Failed To Fetch Users"

         );

      }finally{

         setLoading(false);

      }

   };

   const updateRole =
   async(id,role)=>{

      try{

         const token =
         localStorage.getItem(
            "token"
         );

         await API.put(

            `/users/role/${id}`,

            { role },

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`

               }

            }

         );

         fetchUsers();

      }catch(error){

         console.log(error);

      }

   };

   const updateStatus =
   async(id,status)=>{

      try{

         const token =
         localStorage.getItem(
            "token"
         );

         await API.put(

            `/users/status/${id}`,

            { status },

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`

               }

            }

         );

         fetchUsers();

      }catch(error){

         console.log(error);

      }

   };

   const deleteUser =
   async(id)=>{

      const confirmDelete =
      window.confirm(
         "Delete This User ?"
      );

      if(!confirmDelete){

         return;

      }

      try{

         const token =
         localStorage.getItem(
            "token"
         );

         await API.delete(

            `/users/${id}`,

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`

               }

            }

         );

         fetchUsers();

      }catch(error){

         console.log(error);

      }

   };

   if(

      currentUser?.role !==
      "SUPER_ADMIN"

   ){

      return(

         <div className="min-h-screen flex items-center justify-center">

            <h1 className="text-3xl font-bold text-red-500">

               Unauthorized Access

            </h1>

         </div>

      );

   }

   if(loading){

      return <Loader />;

   }

   return(

      <div className="min-h-screen bg-gray-100 p-8">

         {/* Header */}

         <div className="flex items-center justify-between mb-8">

            <div>

               <h1 className="text-4xl font-bold text-gray-900">

                  User Management

               </h1>

               <p className="text-gray-500 mt-2">

                  Total Users:
                  {" "}
                  {users.length}

               </p>

            </div>

            <button

               // className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"

            >

               

            </button>

         </div>

         {

            error && (

               <ErrorMessage
                  message={error}
               />

            )

         }

         {/* Users */}

         <div className="space-y-5">

            {

               users.map((user)=>(

                  <div

                     key={user._id}

                     className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"

                  >

                     {/* Left */}

                     <div>

                        <h2 className="text-2xl font-bold text-gray-900">

                           {user.name}

                        </h2>

                        <p className="text-gray-500 mt-1">

                           {user.email}

                        </p>

                        <div className="flex items-center gap-3 mt-4">

                           <span className="text-sm font-semibold text-gray-700">

                              Role:

                           </span>

                           <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">

                              {user.role}

                           </span>

                        </div>

                        <div className="flex items-center gap-3 mt-3">

                           <span className="text-sm font-semibold text-gray-700">

                              Status:

                           </span>

                           <span

                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                 user.status === "active"
                                 ?
                                 "bg-green-100 text-green-700"
                                 :
                                 "bg-red-100 text-red-700"
                              }`}

                           >

                              {user.status}

                           </span>

                        </div>

                     </div>

                     {/* Right */}

                     {

                        currentUser._id ===
                        user._id

                        ? (

                           <div className="bg-green-50 text-green-700 px-5 py-3 rounded-xl font-semibold">

                              Super Admin account cannot be modified

                           </div>

                        )

                        : (

                           <div className="flex flex-col md:flex-row gap-4">

                              {/* Role */}

                              <select

                                 value={user.role}

                                 onChange={(e)=>

                                    updateRole(

                                       user._id,

                                       e.target.value

                                    )

                                 }

                                 className="px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"

                              >

                                 <option value="EDITOR">

                                    EDITOR

                                 </option>

                                 <option value="AUTHOR">

                                    AUTHOR

                                 </option>

                                 <option value="VIEWER">

                                    VIEWER

                                 </option>

                              </select>

                              {/* Status */}

                              <select

                                 value={user.status}

                                 onChange={(e)=>

                                    updateStatus(

                                       user._id,

                                       e.target.value

                                    )

                                 }

                                 className="px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"

                              >

                                 <option value="active">

                                    active

                                 </option>

                                 <option value="blocked">

                                    blocked

                                 </option>

                                 <option value="suspended">

                                    suspended

                                 </option>

                              </select>

                              {/* Delete */}

                              <button

                                 onClick={()=>

                                    deleteUser(
                                       user._id
                                    )

                                 }

                                 className="border border-red-300 text-red-500 hover:bg-red-50 px-5 py-3 rounded-xl font-semibold transition"

                              >

                                 Delete User

                              </button>

                           </div>

                        )

                     }

                  </div>

               ))

            }

         </div>

      </div>

   );

}

export default Users;