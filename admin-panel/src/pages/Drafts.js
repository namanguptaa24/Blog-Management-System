import { useEffect, useState } from "react";

import API from "../services/api";

function Drafts(){

   const [blogs, setBlogs] = useState([]);

   const user = JSON.parse(
      localStorage.getItem("user")
   );

   useEffect(() => {

      fetchDrafts();

   }, []);

   const fetchDrafts = async() => {

      try{

         const token = localStorage.getItem(
            "token"
         );

         const res = await API.get(

            "/blogs/drafts",

            {
               headers:{
                  Authorization: token
               }
            }

         );

         setBlogs(res.data);

      }catch(error){

         console.log(error);

      }

   };

   const handlePublish = async(id) => {

      const confirmPublish = window.confirm(

         "Are you sure you want to publish this blog?"

      );

      if(!confirmPublish){

         return;

      }

      try{

         const token = localStorage.getItem(
            "token"
         );

         await API.put(

            `/blogs/publish/${id}`,

            {},

            {
               headers:{
                  Authorization: token
               }
            }

         );

         alert("Blog Published");

         fetchDrafts();

      }catch(error){

         console.log(error);

      }

   };

   return(

      <div>

         <h1>Draft Blogs</h1>

         <h2>
            Total Drafts: {blogs.length}
         </h2>

         {
            blogs.map((blog) => (

               <div
                  key={blog._id}
                  style={{
                     border:"1px solid black",
                     margin:"10px",
                     padding:"10px"
                  }}
               >

                  <h2>
                     {blog.title}
                  </h2>

                  <p>
                     {blog.content}
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

                  {
                     user?.role !== "VIEWER" && (

                        <button
                           onClick={() =>
                              handlePublish(blog._id)
                           }
                        >

                           Publish

                        </button>

                     )
                  }

               </div>

            ))
         }

      </div>

   );

}

export default Drafts;