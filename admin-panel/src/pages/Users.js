import {

   useEffect,
   useState

} from "react";

import API from "../services/api";

import Loader
from "../components/Loader";

import ErrorMessage
from "../components/ErrorMessage";

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

         setError("");

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

         alert(
            "Role Updated"
         );

         fetchUsers();

      }catch(error){

         console.log(error);

         setError(

            error.response?.data?.message ||

            "Role Update Failed"

         );

      }

   };

   const updateStatus =
   async(id,status)=>{

      try{

         setError("");

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

         alert(
            "Status Updated"
         );

         fetchUsers();

      }catch(error){

         console.log(error);

         setError(

            error.response?.data?.message ||

            "Status Update Failed"

         );

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

         setError("");

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

         alert(
            "User Deleted"
         );

         fetchUsers();

      }catch(error){

         console.log(error);

         setError(

            error.response?.data?.message ||

            "Delete Failed"

         );

      }

   };

   if(

      currentUser?.role !==
      "SUPER_ADMIN"

   ){

      return(

         <h1>

            Unauthorized Access

         </h1>

      );

   }

   if(loading){

      return <Loader />;

   }

   return(

      <div>

         <h1>User Management</h1>

         <h2>

            Total Users:
            {users.length}

         </h2>

         {

            error && (

               <ErrorMessage
                  message={error}
               />

            )

         }

         {

            users.length === 0 && (

               <h2>
                  No Users Found
               </h2>

            )

         }

         {

            users.map((user)=>(

               <div

                  key={user._id}

                  style={{

                     border:
                     "1px solid black",

                     margin:"10px",

                     padding:"10px"

                  }}

               >

                  <h3>
                     {user.name}
                  </h3>

                  <p>
                     {user.email}
                  </p>

                  <p>

                     Role:
                     {" "}

                     {user.role}

                  </p>

                  <p>

                     Status:
                     {" "}

                     {user.status}

                  </p>

                  {

                     currentUser._id ===
                     user._id

                     ? (

                        <p>

                           Super Admin account
                           cannot be modified

                        </p>

                     )

                     : (

                        <>

                           <select

                              value={user.role}

                              onChange={(e)=>

                                 updateRole(

                                    user._id,

                                    e.target.value

                                 )

                              }

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

                           <br /><br />

                           <select

                              value={user.status}

                              onChange={(e)=>

                                 updateStatus(

                                    user._id,

                                    e.target.value

                                 )

                              }

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

                           <br /><br />

                           <button

                              onClick={()=>

                                 deleteUser(
                                    user._id
                                 )

                              }

                           >

                              Delete User

                           </button>

                        </>

                     )

                  }

               </div>

            ))

         }

      </div>

   );

}

export default Users;