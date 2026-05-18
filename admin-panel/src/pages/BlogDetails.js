import { useEffect,useState } from "react";

import {

   useParams,
   Link

} from "react-router-dom";

import API from "../services/api";

function BlogDetails(){

   const { slug } = useParams();

   const [blog,setBlog] =
   useState(null);

   useEffect(()=>{

      fetchBlog();

   },[slug]);

   const fetchBlog = async()=>{

      try{

         const res = await API.get(

            `/blogs/${slug}`

         );

         setBlog(res.data);

      }catch(error){

         console.log(error);

         alert(

            error.response?.data?.message ||

            "Failed To Fetch Blog"

         );

      }

   };

   const cleanArrayData = (data)=>{

      if(!data){

         return [];

      }

      return data.flatMap((item)=>{

         if(typeof item === "string"){

            return item

            .replace("[","")

            .replace("]","")

            .replaceAll('"',"")

            .split(",");

         }

         return item;

      });

   };

   if(!blog){

      return <h1>Loading...</h1>;

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

            <b>Author:</b>

            {" "}

            {blog.author?.name}

         </p>

         <p>

            <b>Status:</b>

            {" "}

            {blog.status}

         </p>

         <hr />

         <h3>Content</h3>

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

         <hr />

         <h3>Canonical URL</h3>

         <p>
            {blog.canonicalUrl}
         </p>

         <hr />

         <h3>Feature Image</h3>

         {

            blog.featureImage && (

               <img

                  src={blog.featureImage}

                  alt="Feature"

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

            blog.ogImage && (

               <img

                  src={blog.ogImage}

                  alt="OG"

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

               cleanArrayData(blog.tags)

               .map((tag,index)=>(

                  <li key={index}>

                     <Link

                        to={`/tag/${tag.trim()}`}

                     >

                        {tag.trim()}

                     </Link>

                  </li>

               ))

            }

         </ul>

         <h3>Categories</h3>

         <ul>

            {

               cleanArrayData(blog.categories)

               .map((cat,index)=>(

                  <li key={index}>

                     <Link

                        to={`/category/${cat.trim()}`}

                     >

                        {cat.trim()}

                     </Link>

                  </li>

               ))

            }

         </ul>

         <hr />

         <h3>FAQ</h3>

         {

            blog.faq?.map((item,index)=>(

               <div key={index}>

                  <h4>
                     {item.question}
                  </h4>

                  <p>
                     {item.answer}
                  </p>

               </div>

            ))

         }

         <hr />

         <h3>Internal Links</h3>

         <ul>

            {

               cleanArrayData(
                  blog.internalLinks
               )

               .map((link,index)=>(

                  <li key={index}>
                     {link.trim()}
                  </li>

               ))

            }

         </ul>

         <hr />

         <h3>External Links</h3>

         <ul>

            {

               cleanArrayData(
                  blog.externalLinks
               )

               .map((link,index)=>(

                  <li key={index}>
                     {link.trim()}
                  </li>

               ))

            }

         </ul>

      </div>

   );

}

export default BlogDetails;