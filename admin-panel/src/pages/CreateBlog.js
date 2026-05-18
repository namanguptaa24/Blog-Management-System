import {

   useState,
   useEffect

} from "react";

import API from "../services/api";

import {
   useNavigate
} from "react-router-dom";

function CreateBlog(){

   const navigate =
   useNavigate();

   const [formData,setFormData] = useState({

      title:"",
      content:"",
      metaTitle:"",
      metaDescription:"",
      canonicalUrl:"",

      featureImage:null,
      ogImage:null,

      featureImagePreview:"",
      ogImagePreview:"",

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

      status:"published"

   });

   useEffect(()=>{

      const savedData =
      JSON.parse(

         localStorage.getItem(
            "draftPreview"
         )

      );

      if(savedData){

         setFormData({

            ...formData,

            ...savedData,

            featureImage:null,

            ogImage:null,

            featureImagePreview:"",

            ogImagePreview:""

         });

      }

   },[]);

   const convertToBase64 = (file)=>{

      return new Promise((resolve,reject)=>{

         const reader =
         new FileReader();

         reader.readAsDataURL(file);

         reader.onload = ()=>{

            resolve(reader.result);

         };

         reader.onerror = (error)=>{

            reject(error);

         };

      });

   };

   const handleChange = async(e)=>{

      if(

         e.target.name ===
         "featureImage"

      ){

         const file =
         e.target.files[0];

         if(!file){

            return;

         }

         const base64 =
         await convertToBase64(
            file
         );

         setFormData({

            ...formData,

            featureImage:file,

            featureImagePreview:
            base64

         });

         return;

      }

      if(

         e.target.name ===
         "ogImage"

      ){

         const file =
         e.target.files[0];

         if(!file){

            return;

         }

         const base64 =
         await convertToBase64(
            file
         );

         setFormData({

            ...formData,

            ogImage:file,

            ogImagePreview:
            base64

         });

         return;

      }

      const updatedData = {

         ...formData,

         [e.target.name]:
         e.target.value

      };

      setFormData(updatedData);

      localStorage.setItem(

         "draftPreview",

         JSON.stringify({

            title:
            updatedData.title,

            content:
            updatedData.content,

            metaTitle:
            updatedData.metaTitle,

            metaDescription:
            updatedData.metaDescription,

            canonicalUrl:
            updatedData.canonicalUrl,

            ogTitle:
            updatedData.ogTitle,

            ogDescription:
            updatedData.ogDescription,

            twitterTitle:
            updatedData.twitterTitle,

            twitterDescription:
            updatedData.twitterDescription,

            tags:
            updatedData.tags,

            categories:
            updatedData.categories,

            faqQuestion:
            updatedData.faqQuestion,

            faqAnswer:
            updatedData.faqAnswer,

            internalLinks:
            updatedData.internalLinks,

            externalLinks:
            updatedData.externalLinks,

            status:
            updatedData.status

         })

      );

   };

   const handlePreview = ()=>{

      navigate(

         "/preview-blog",

         {

            state:formData

         }

      );

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

            JSON.stringify(

               formData.tags
               .split(",")

            )

         );

         data.append(

            "categories",

            JSON.stringify(

               formData.categories
               .split(",")

            )

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

            JSON.stringify(

               formData.internalLinks
               .split(",")

            )

         );

         data.append(

            "externalLinks",

            JSON.stringify(

               formData.externalLinks
               .split(",")

            )

         );

         data.append(
            "status",
            formData.status
         );

         const res = await API.post(

            "/blogs/create",

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

         localStorage.removeItem(
            "draftPreview"
         );

         alert(
            "Blog Created Successfully"
         );

         navigate(

            `/blogs/${res.data.blog.slug}`

         );

      }catch(error){

         console.log(error);

         alert(

            error.response?.data?.message ||

            "Blog Creation Failed"

         );

      }

   };

   return(

      <div>

         <h1>Create Blog</h1>

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
               onChange={handleChange}
            />

            <br /><br />

            {

               formData.featureImagePreview && (

                  <img

                     src={
                        formData.featureImagePreview
                     }

                     alt="preview"

                     width="250"

                  />

               )

            }

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
               onChange={handleChange}
            />

            <br /><br />

            {

               formData.ogImagePreview && (

                  <img

                     src={
                        formData.ogImagePreview
                     }

                     alt="og preview"

                     width="250"

                  />

               )

            }

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
               placeholder="Tags comma separated"
               value={formData.tags}
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="text"
               name="categories"
               placeholder="Categories comma separated"
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

               <option value="published">
                  Published
               </option>

               <option value="draft">
                  Draft
               </option>

            </select>

            <br /><br />

            <button
               type="button"
               onClick={handlePreview}
            >

               Preview Blog

            </button>

            {" "}

            <button type="submit">

               Create Blog

            </button>

         </form>

      </div>

   );

}

export default CreateBlog;