import {
   useEffect,
   useState
} from "react";

import {
   useParams,
   Link
} from "react-router-dom";

import API from "../services/api";

const parseArray = (data)=>{

   if(!data){

      return [];

   }

   if(Array.isArray(data)){

      return data.map((item)=>

         String(item)

            .replace(/\[/g,"")

            .replace(/\]/g,"")

            .replace(/"/g,"")

            .trim()

      );

   }

   return String(data)

      .replace(/\[/g,"")

      .replace(/\]/g,"")

      .replace(/"/g,"")

      .split(",")

      .map((item)=>

         item.trim()

      )

      .filter(Boolean);

};

function BlogDetails(){

   const { slug } =
   useParams();

   const [blog,setBlog] =
   useState(null);

   const [loading,setLoading] =
   useState(true);

   useEffect(()=>{

      fetchBlog();

   },[slug]);

   const fetchBlog = async()=>{

      try{

         const res =
         await API.get(
            `/blogs/${slug}`
         );

         console.log(
            "BLOG DATA =>",
            res.data
         );

         setBlog(res.data);

      }catch(error){

         console.log(error);

      }finally{

         setLoading(false);

      }

   };

   if(loading){

      return <h1>Loading...</h1>;

   }

   if(!blog){

      return <h1>Blog Not Found</h1>;

   }

   return(

      <div
         style={{

            maxWidth:"1000px",

            margin:"auto",

            padding:"30px",

            fontFamily:"Arial"

         }}
      >

         <Link
            to="/"
            style={{

               textDecoration:"none",

               color:"blue",

               fontWeight:"bold"

            }}
         >

            ← Back To Home

         </Link>

         <br />
         <br />

         {

            blog.featureImage && (

               <img

                  src={blog.featureImage}

                  alt={blog.title}

                  width="100%"

                  style={{

                     borderRadius:"10px",

                     maxHeight:"500px",

                     objectFit:"cover"

                  }}

               />

            )

         }

         <h1
            style={{

               marginTop:"20px"

            }}
         >

            {blog.title}

         </h1>

         <p>

            <b>Status:</b>

            {" "}

            {blog.status}

         </p>

         <p>

            <b>Author:</b>

            {" "}

            {

               blog.author?.name ||

               "Unknown"

            }

         </p>

         <hr />

         <h2>
            Content
         </h2>

         <p
            style={{

               lineHeight:"35px",

               fontSize:"18px"

            }}
         >

            {blog.content}

         </p>

         <hr />

         <h2>
            SEO Metadata
         </h2>

         <p>

            <b>Meta Title:</b>

            {" "}

            {blog.metaTitle}

         </p>

         <p>

            <b>Meta Description:</b>

            {" "}

            {blog.metaDescription}

         </p>

         <p>

            <b>Canonical URL:</b>

            {" "}

            <a
               href={blog.canonicalUrl}
               target="_blank"
               rel="noreferrer"
            >

               {blog.canonicalUrl}

            </a>

         </p>

         <hr />

         <h2>
            Open Graph SEO
         </h2>

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

            blog.ogImage && (

               <img

                  src={blog.ogImage}

                  alt="og"

                  width="300"

                  style={{

                     borderRadius:"10px"

                  }}

               />

            )

         }

         <hr />

         <h2>
            Twitter SEO
         </h2>

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

         <h2>
            Tags
         </h2>

         <div
            style={{

               display:"flex",

               gap:"10px",

               flexWrap:"wrap"

            }}
         >

            {

               parseArray(blog.tags).map(

                  (tag,index)=>(

                     <span

                        key={index}

                        style={{

                           background:"#eee",

                           padding:"8px 15px",

                           borderRadius:"20px"

                        }}
                     >

                        #{tag}

                     </span>

                  )

               )

            }

         </div>

         <hr />

         <h2>
            Categories
         </h2>

         <div
            style={{

               display:"flex",

               gap:"10px",

               flexWrap:"wrap"

            }}
         >

            {

               parseArray(blog.categories).map(

                  (cat,index)=>(

                     <span

                        key={index}

                        style={{

                           background:"#dff0ff",

                           padding:"8px 15px",

                           borderRadius:"20px"

                        }}
                     >

                        {cat}

                     </span>

                  )

               )

            }

         </div>

         <hr />

         <h2>
            FAQ
         </h2>

         {

            blog.faq &&
            blog.faq.length > 0 ? (

               <div
                  style={{

                     background:"#f8f8f8",

                     padding:"20px",

                     borderRadius:"10px",

                     marginTop:"10px"

                  }}
               >

                  <h3
                     style={{

                        marginBottom:"15px"

                     }}
                  >

                     {

                        blog.faq[0].question

                     }

                  </h3>

                  <p
                     style={{

                        lineHeight:"30px"

                     }}
                  >

                     {

                        blog.faq[0].answer

                     }

                  </p>

               </div>

            ) : (

               <p>

                  No FAQ Available

               </p>

            )

         }

         <hr />

         <h2>
            Internal Links
         </h2>

         <ul>

            {

               parseArray(

                  blog.internalLinks

               ).map(

                  (link,index)=>(

                     <li key={index}>

                        <a
                           href={link}
                           target="_blank"
                           rel="noreferrer"
                        >

                           {link}

                        </a>

                     </li>

                  )

               )

            }

         </ul>

         <hr />

         <h2>
            External Links
         </h2>

         <ul>

            {

               parseArray(

                  blog.externalLinks

               ).map(

                  (link,index)=>(

                     <li key={index}>

                        <a

                           href={link}

                           target="_blank"

                           rel="noreferrer"

                        >

                           {link}

                        </a>

                     </li>

                  )

               )

            }

         </ul>

      </div>

   );

}

export default BlogDetails;