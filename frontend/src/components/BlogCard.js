import {

   Link

} from "react-router-dom";

function BlogCard({ blog }){

   return(

      <div
         style={{

            border:"1px solid #ccc",

            padding:"20px",

            marginBottom:"20px",

            borderRadius:"10px"

         }}
      >

         {

            blog.featureImage && (

               <img

                  src={blog.featureImage}

                  alt={blog.title}

                  width="100%"

                  style={{

                     maxHeight:"300px",

                     objectFit:"cover",

                     borderRadius:"10px"

                  }}

               />

            )

         }

         <h2>
            {blog.title}
         </h2>

         <p>
            {blog.metaDescription}
         </p>

         <p>

            <b>Category:</b>

            {" "}

            {

               Array.isArray(blog.categories)

               ? blog.categories.join(", ")

               : blog.categories

            }

         </p>

         <p>

            <b>Tags:</b>

            {" "}

            {

               Array.isArray(blog.tags)

               ? blog.tags.join(", ")

               : blog.tags

            }

         </p>

         <Link
            to={`/blog/${blog.slug}`}
         >

            <button>

               Read More

            </button>

         </Link>

      </div>

   );

}

export default BlogCard;