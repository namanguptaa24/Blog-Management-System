import { useEffect,useState } from "react";

import {

   useNavigate,
   useParams

} from "react-router-dom";

import API from "../services/api";

function EditBlog(){

   const { id } = useParams();

   const navigate = useNavigate();

   const [loading,setLoading] =
   useState(false);

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

      setLoading(true);

      try{

         const token =
         localStorage.getItem(
            "token"
         );

         const data =
         new FormData();

         Object.keys(formData).forEach((key)=>{

            if(

               formData[key] !== null

            ){

               data.append(

                  key,

                  formData[key]

               );

            }

         });

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

         alert(
            "Blog Updated Successfully"
         );

         navigate("/blogs");

      }catch(error){

         console.log(error);

         alert(

            error.response?.data?.message ||

            "Update Failed"

         );

      }finally{

         setLoading(false);

      }

   };

   return(

      <div className="min-h-screen bg-gray-100 p-8">

         <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg p-10">

            {/* Heading */}

            <div className="mb-10">

               <h1 className="text-5xl font-bold text-gray-900">

                  Edit Blog

               </h1>

               <p className="text-gray-500 mt-3 text-lg">

                  Update your blog content, SEO and metadata

               </p>

            </div>

            <form
               onSubmit={handleSubmit}
               className="space-y-8"
            >

               {/* Title */}

               <input

                  type="text"

                  name="title"

                  placeholder="Blog Title"

                  value={formData.title}

                  onChange={handleChange}

                  className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"

               />

               {/* Content */}

               <textarea

                  name="content"

                  placeholder="Write Blog Content..."

                  value={formData.content}

                  onChange={handleChange}

                  rows="10"

                  className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg resize-none"

               />

               {/* SEO Grid */}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <input

                     type="text"

                     name="metaTitle"

                     placeholder="Meta Title"

                     value={formData.metaTitle}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"

                  />

                  <input

                     type="text"

                     name="metaDescription"

                     placeholder="Meta Description"

                     value={formData.metaDescription}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"

                  />

               </div>

               {/* Canonical */}

               <input

                  type="text"

                  name="canonicalUrl"

                  placeholder="Canonical URL"

                  value={formData.canonicalUrl}

                  onChange={handleChange}

                  className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"

               />

               {/* Images */}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* Feature */}

                  <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 bg-gray-50 text-center">

                     <h2 className="text-2xl font-bold mb-5">

                        Feature Image

                     </h2>

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

                        className="w-full"

                     />

                  </div>

                  {/* OG */}

                  <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 bg-gray-50 text-center">

                     <h2 className="text-2xl font-bold mb-5">

                        OG Image

                     </h2>

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

                        className="w-full"

                     />

                  </div>

               </div>

               {/* Open Graph */}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <input

                     type="text"

                     name="ogTitle"

                     placeholder="OG Title"

                     value={formData.ogTitle}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300"

                  />

                  <input

                     type="text"

                     name="ogDescription"

                     placeholder="OG Description"

                     value={formData.ogDescription}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300"

                  />

               </div>

               {/* Twitter */}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <input

                     type="text"

                     name="twitterTitle"

                     placeholder="Twitter Title"

                     value={formData.twitterTitle}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300"

                  />

                  <input

                     type="text"

                     name="twitterDescription"

                     placeholder="Twitter Description"

                     value={formData.twitterDescription}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300"

                  />

               </div>

               {/* Tags */}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <input

                     type="text"

                     name="tags"

                     placeholder="Tags (comma separated)"

                     value={formData.tags}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300"

                  />

                  <input

                     type="text"

                     name="categories"

                     placeholder="Categories (comma separated)"

                     value={formData.categories}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300"

                  />

               </div>

               {/* FAQ */}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <input

                     type="text"

                     name="faqQuestion"

                     placeholder="FAQ Question"

                     value={formData.faqQuestion}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300"

                  />

                  <input

                     type="text"

                     name="faqAnswer"

                     placeholder="FAQ Answer"

                     value={formData.faqAnswer}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300"

                  />

               </div>

               {/* Links */}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <input

                     type="text"

                     name="internalLinks"

                     placeholder="Internal Links"

                     value={formData.internalLinks}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300"

                  />

                  <input

                     type="text"

                     name="externalLinks"

                     placeholder="External Links"

                     value={formData.externalLinks}

                     onChange={handleChange}

                     className="px-5 py-4 rounded-2xl border border-gray-300"

                  />

               </div>

               {/* Status */}

               <select

                  name="status"

                  value={formData.status}

                  onChange={handleChange}

                  className="w-full px-5 py-4 rounded-2xl border border-gray-300"

               >

                  <option value="draft">

                     Draft

                  </option>

                  <option value="published">

                     Published

                  </option>

               </select>

               {/* Buttons */}

               <div className="flex flex-wrap gap-5 pt-6">

                  <button

                     type="submit"

                     disabled={loading}

                     className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:opacity-90 transition"

                  >

                     {

                        loading

                        ?

                        "Updating..."

                        :

                        "Update Blog"

                     }

                  </button>

                  <button

                     type="button"

                     onClick={()=>navigate("/blogs")}

                     className="border border-gray-300 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition"

                  >

                     Cancel

                  </button>

               </div>

            </form>

         </div>

      </div>

   );

}

export default EditBlog;