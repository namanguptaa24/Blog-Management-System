import { useEffect,useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import Loader
from "../components/Loader";

import ErrorMessage
from "../components/ErrorMessage";

function Blogs(){

   const [blogs,setBlogs] =
   useState([]);

   const [loading,setLoading] =
   useState(true);

   const [error,setError] =
   useState("");

   const user = JSON.parse(
      localStorage.getItem("user")
   );

   useEffect(()=>{

      fetchBlogs();

   },[]);

   const fetchBlogs = async()=>{

      try{

         setError("");

         const res = await API.get(
            "/blogs"
         );

         setBlogs(res.data);

      }catch(error){

         console.log(error);

         setError(

            error.response?.data?.message ||

            "Failed To Fetch Blogs"

         );

      }finally{

         setLoading(false);

      }

   };

   const deleteBlog = async(id)=>{

      const confirmDelete =
      window.confirm(

         "Are You Sure You Want To Delete This Blog ?"

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

            `/blogs/delete/${id}`,

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`

               }

            }

         );

         alert("Blog Deleted");

         fetchBlogs();

      }catch(error){

         console.log(error);

         setError(

            error.response?.data?.message ||

            "Delete Failed"

         );

      }

   };

   if(loading){

      return <Loader />;

   }

   return(

      <div>

         <h1>Blogs</h1>

         <h2>

            Total Blogs:
            {blogs.length}

         </h2>

         {

            error && (

               <ErrorMessage
                  message={error}
               />

            )

         }

         {

            blogs.length === 0 && (

               <h2>
                  No Blogs Found
               </h2>

            )

         }

         {

            blogs.map((blog)=>(

               <div

                  key={blog._id}

                  style={{

                     border:
                     "1px solid black",

                     margin:"10px",

                     padding:"10px"

                  }}

               >

                  <h2>
                     {blog.title}
                  </h2>

                  <p>
                     {blog.metaDescription}
                  </p>

                  <p>

                     Author:
                     {" "}

                     {blog.author?.name}

                  </p>

                  <p>

                     Status:
                     {" "}

                     {blog.status}

                  </p>

                  <Link
                     to={`/blogs/${blog.slug}`}
                  >

                     Read Full Blog

                  </Link>

                  <br />

                  {

                     user?.role ===
                     "SUPER_ADMIN"

                     ||

                     user?.role ===
                     "EDITOR"

                     ||

                     (

                        user?.role ===
                        "AUTHOR"

                        &&

                        blog.author?._id
                        ===

                        user?._id

                     )

                     ? (

                        <button

                           onClick={()=>
                           deleteBlog(blog._id)
                           }

                           style={{

                              marginTop:"10px",

                              cursor:"pointer"

                           }}

                        >

                           Delete

                        </button>

                     )

                     : null

                  }

                  {

                     user?.role ===
                     "SUPER_ADMIN"

                     ||

                     user?.role ===
                     "EDITOR"

                     ||

                     (

                        user?.role ===
                        "AUTHOR"

                        &&

                        blog.author?._id
                        ===

                        user?._id

                     )

                     ? (

                        <button

                           onClick={()=>{

                              window.location.href =
                              `/edit-blog/${blog._id}`;

                           }}

                           style={{

                              marginLeft:"10px",

                              marginTop:"10px",

                              cursor:"pointer"

                           }}

                        >

                           Edit

                        </button>

                     )

                     : null

                  }

               </div>

            ))

         }

      </div>

   );

}

export default Blogs;