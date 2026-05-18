import { useEffect,useState } from "react";

import {

   useNavigate,
   useParams

} from "react-router-dom";

import API from "../services/api";

function EditBlog(){

   const { id } = useParams();

   const navigate = useNavigate();

   const [formData,setFormData] =
   useState({

      title:"",
      content:"",
      metaTitle:"",
      metaDescription:"",
      canonicalUrl:"",
      ogTitle:"",
      ogDescription:"",
      twitterTitle:"",
      twitterDescription:"",
      tags:"",
      categories:"",
      faqQuestion:"",
      faqAnswer:"",
      internalLinks:"",
      externalLinks:"",
      status:"draft",

      featureImage:null,
      ogImage:null

   });

   useEffect(()=>{

      fetchBlog();

   },[]);

   const fetchBlog = async()=>{

      try{

         const token =
         localStorage.getItem(
            "token"
         );

         const res = await API.get(

            `/blogs/edit/${id}`,

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`

               }

            }

         );

         setFormData({

            title:
            res.data.title || "",

            content:
            res.data.content || "",

            metaTitle:
            res.data.metaTitle || "",

            metaDescription:
            res.data.metaDescription || "",

            canonicalUrl:
            res.data.canonicalUrl || "",

            ogTitle:
            res.data.ogTitle || "",

            ogDescription:
            res.data.ogDescription || "",

            twitterTitle:
            res.data.twitterTitle || "",

            twitterDescription:
            res.data.twitterDescription || "",

            tags:
            res.data.tags?.join(",") || "",

            categories:
            res.data.categories?.join(",") || "",

            faqQuestion:
            res.data.faq?.[0]?.question || "",

            faqAnswer:
            res.data.faq?.[0]?.answer || "",

            internalLinks:
            res.data.internalLinks?.join(",") || "",

            externalLinks:
            res.data.externalLinks?.join(",") || "",

            status:
            res.data.status || "draft",

            featureImage:null,
            ogImage:null

         });

      }catch(error){

         console.log(error);

         alert(

            error.response?.data?.message ||

            "Failed To Fetch Blog"

         );

      }

   };

   const handleChange = (e)=>{

      setFormData({

         ...formData,

         [e.target.name]:
         e.target.value

      });

   };

   const handleSubmit = async(e)=>{

      e.preventDefault();

      try{

         const token =
         localStorage.getItem(
            "token"
         );

         const data =
         new FormData();

         data.append(
            "title",
            formData.title
         );

         data.append(
            "content",
            formData.content
         );

         data.append(
            "metaTitle",
            formData.metaTitle
         );

         data.append(
            "metaDescription",
            formData.metaDescription
         );

         data.append(
            "canonicalUrl",
            formData.canonicalUrl
         );

         data.append(
            "ogTitle",
            formData.ogTitle
         );

         data.append(
            "ogDescription",
            formData.ogDescription
         );

         data.append(
            "twitterTitle",
            formData.twitterTitle
         );

         data.append(
            "twitterDescription",
            formData.twitterDescription
         );

         data.append(
            "tags",
            formData.tags
         );

         data.append(
            "categories",
            formData.categories
         );

         data.append(
            "faqQuestion",
            formData.faqQuestion
         );

         data.append(
            "faqAnswer",
            formData.faqAnswer
         );

         data.append(
            "internalLinks",
            formData.internalLinks
         );

         data.append(
            "externalLinks",
            formData.externalLinks
         );

         data.append(
            "status",
            formData.status
         );

         if(formData.featureImage){

            data.append(

               "featureImage",

               formData.featureImage

            );

         }

         if(formData.ogImage){

            data.append(

               "ogImage",

               formData.ogImage

            );

         }

         await API.put(

            `/blogs/update/${id}`,

            data,

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`,

                  "Content-Type":
                  "multipart/form-data"

               }

            }

         );

         alert("Blog Updated");

         navigate("/blogs");

      }catch(error){

         console.log(error);

         alert(

            error.response?.data?.message ||

            "Update Failed"

         );

      }

   };

   return(

      <div>

         <h1>Edit Blog</h1>

         <form onSubmit={handleSubmit}>

            <input
               type="text"
               name="title"
               placeholder="Title"
               value={formData.title}
               onChange={handleChange}
            />

            <br /><br />

            <textarea
               name="content"
               placeholder="Content"
               value={formData.content}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="metaTitle"
               placeholder="Meta Title"
               value={formData.metaTitle}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="metaDescription"
               placeholder="Meta Description"
               value={formData.metaDescription}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="canonicalUrl"
               placeholder="Canonical URL"
               value={formData.canonicalUrl}
               onChange={handleChange}
            />

            <br /><br />

            <h3>Feature Image</h3>

            <input
               type="file"
               name="featureImage"
               onChange={(e)=>{

                  setFormData({

                     ...formData,

                     featureImage:
                     e.target.files[0]

                  });

               }}
            />

            <br /><br />

            <h3>Open Graph SEO</h3>

            <input
               type="text"
               name="ogTitle"
               placeholder="OG Title"
               value={formData.ogTitle}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="ogDescription"
               placeholder="OG Description"
               value={formData.ogDescription}
               onChange={handleChange}
            />

            <br /><br />

            <h3>OG Image Upload</h3>

            <input
               type="file"
               name="ogImage"
               onChange={(e)=>{

                  setFormData({

                     ...formData,

                     ogImage:
                     e.target.files[0]

                  });

               }}
            />

            <br /><br />

            <h3>Twitter SEO</h3>

            <input
               type="text"
               name="twitterTitle"
               placeholder="Twitter Title"
               value={formData.twitterTitle}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="twitterDescription"
               placeholder="Twitter Description"
               value={formData.twitterDescription}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="tags"
               placeholder="Tags"
               value={formData.tags}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="categories"
               placeholder="Categories"
               value={formData.categories}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="faqQuestion"
               placeholder="FAQ Question"
               value={formData.faqQuestion}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="faqAnswer"
               placeholder="FAQ Answer"
               value={formData.faqAnswer}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="internalLinks"
               placeholder="Internal Links"
               value={formData.internalLinks}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="externalLinks"
               placeholder="External Links"
               value={formData.externalLinks}
               onChange={handleChange}
            />

            <br /><br />

            <select
               name="status"
               value={formData.status}
               onChange={handleChange}
            >

               <option value="draft">
                  Draft
               </option>

               <option value="published">
                  Published
               </option>

            </select>

            <br /><br />

            <button type="submit">

               Update Blog

            </button>

         </form>

      </div>

   );

}

export default EditBlog;