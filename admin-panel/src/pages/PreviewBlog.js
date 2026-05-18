import {
   useLocation,
   useNavigate
} from "react-router-dom";

function PreviewBlog(){

   const location =
   useLocation();

   const navigate =
   useNavigate();

   const blog =
   location.state;

   if(!blog){

      return(

         <div
            style={{
               padding:"20px"
            }}
         >

            <h1>
               No Preview Data
            </h1>

            <button

               onClick={()=>
               navigate("/create-blog")
               }

            >

               Back To Create Blog

            </button>

         </div>

      );

   }

   return(

      <div
         style={{
            padding:"20px"
         }}
      >

         <h1>
            {blog.title}
         </h1>

         <p>
            {blog.content}
         </p>

         <hr />

         <h3>Meta Title</h3>

         <p>
            {blog.metaTitle}
         </p>

         <h3>Meta Description</h3>

         <p>
            {blog.metaDescription}
         </p>

         <h3>Canonical URL</h3>

         <p>
            {blog.canonicalUrl}
         </p>

         <hr />

         <h3>Feature Image</h3>

         {

            blog.featureImagePreview && (

               <img

                  src={
                     blog.featureImagePreview
                  }

                  alt="feature"

                  width="400"

               />

            )

         }

         <hr />

         <h3>Open Graph SEO</h3>

         <p>

            <b>OG Title:</b>

            {" "}

            {blog.ogTitle}

         </p>

         <p>

            <b>OG Description:</b>

            {" "}

            {blog.ogDescription}

         </p>

         {

            blog.ogImagePreview && (

               <img

                  src={
                     blog.ogImagePreview
                  }

                  alt="og"

                  width="300"

               />

            )

         }

         <hr />

         <h3>Twitter SEO</h3>

         <p>

            <b>Twitter Title:</b>

            {" "}

            {blog.twitterTitle}

         </p>

         <p>

            <b>Twitter Description:</b>

            {" "}

            {blog.twitterDescription}

         </p>

         <hr />

         <h3>Tags</h3>

         <ul>

            {

               blog.tags

               ?.split(",")

               .map((tag,index)=>(

                  <li key={index}>
                     {tag}
                  </li>

               ))

            }

         </ul>

         <h3>Categories</h3>

         <ul>

            {

               blog.categories

               ?.split(",")

               .map((cat,index)=>(

                  <li key={index}>
                     {cat}
                  </li>

               ))

            }

         </ul>

         <hr />

         <h3>FAQ</h3>

         <h4>
            {blog.faqQuestion}
         </h4>

         <p>
            {blog.faqAnswer}
         </p>

         <hr />

         <h3>Internal Links</h3>

         <ul>

            {

               blog.internalLinks

               ?.split(",")

               .map((link,index)=>(

                  <li key={index}>
                     {link}
                  </li>

               ))

            }

         </ul>

         <hr />

         <h3>External Links</h3>

         <ul>

            {

               blog.externalLinks

               ?.split(",")

               .map((link,index)=>(

                  <li key={index}>
                     {link}
                  </li>

               ))

            }

         </ul>

         <hr />

         <h3>Status</h3>

         <p>
            {blog.status}
         </p>

         <br />

         <button

            onClick={()=>
            navigate(-1)
            }

         >

            Back

         </button>

      </div>

   );

}

export default PreviewBlog;