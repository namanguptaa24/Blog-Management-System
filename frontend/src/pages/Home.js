import {

   useEffect,
   useState

} from "react";

import API from "../services/api";
import BlogCard from "../components/BlogCard";
function Home(){

   const [blogs,setBlogs] =
   useState([]);

   const [loading,setLoading] =
   useState(true);

   const [error,setError] =
   useState("");

   useEffect(()=>{

      fetchBlogs();

   },[]);

   const fetchBlogs = async()=>{

      try{

         const res =
         await API.get("/blogs");

         console.log(res.data);

         setBlogs(

            Array.isArray(res.data)

            ? res.data

            : []

         );

      }catch(error){

         console.log(error);

         setError(
            "Failed to load blogs"
         );

      }finally{

         setLoading(false);

      }

   };

   if(loading){

      return <h1>Loading...</h1>;

   }

   if(error){

      return <h1>{error}</h1>;

   }

   return(

      <div
         style={{
            padding:"20px"
         }}
      >

         <h1>

            Latest Blogs

         </h1>

         <h3>

            Total Blogs:

            {" "}

            {blogs.length}

         </h3>
         {

              blogs.map((blog)=>(

              <BlogCard

         key={blog._id}

         blog={blog}

      />

   ))

}
      </div>

   );

}

export default Home;