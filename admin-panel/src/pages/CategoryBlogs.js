import {

   useEffect,
   useState

} from "react";

import {

   useParams,
   Link

} from "react-router-dom";

import API from "../services/api";

function CategoryBlogs(){

   const { categoryName } =
   useParams();

   const [blogs,setBlogs] =
   useState([]);

   const [loading,setLoading] =
   useState(true);

   useEffect(()=>{

      fetchBlogs();

   },[categoryName]);

   const fetchBlogs =
   async()=>{

      try{

         const res =
         await API.get(
            "/blogs"
         );

         const filteredBlogs =

         res.data.filter((blog)=>

            blog.categories?.includes(
               categoryName
            )

         );

         setBlogs(
            filteredBlogs
         );

      }catch(error){

         console.log(error);

      }finally{

         setLoading(false);

      }

   };

   if(loading){

      return <h1>Loading...</h1>;

   }

   return(

      <div>

         <h1>

            Category:
            {" "}
            {categoryName}

         </h1>

         {

            blogs.length === 0

            ? (

               <h2>
                  No Blogs Found
               </h2>

            )

            : (

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

                     <Link

                        to={`/blogs/${blog.slug}`}

                     >

                        Read Blog

                     </Link>

                  </div>

               ))

            )

         }

      </div>

   );

}

export default CategoryBlogs;