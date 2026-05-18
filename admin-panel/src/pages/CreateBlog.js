import {

   useState,
   useEffect

} from "react";

import axios from "axios";

import {

   useNavigate

} from "react-router-dom";

function CreateBlog(){

   const navigate =
   useNavigate();

   // LOCAL STORAGE DATA

   const savedPreview =

      JSON.parse(

         localStorage.getItem(
            "previewBlog"
         )

      )

      ||

      {};

   // FORM DATA

   const [formData,setFormData] =
   useState(

      savedPreview?.formData

      ||

      {

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
         status:"published"

      }

   );

   // IMAGES

   const [featureImage,
   setFeatureImage] =
   useState(null);

   const [ogImage,
   setOgImage] =
   useState(null);

   // IMAGE PREVIEWS

   const [featurePreview,
   setFeaturePreview] =
   useState("");

   const [ogPreview,
   setOgPreview] =
   useState("");

   const [loading,
   setLoading] =
   useState(false);

   const token =
   localStorage.getItem("token");

   // SAVE ONLY TEXT DATA

   useEffect(()=>{

      try{

         localStorage.setItem(

            "previewBlog",

            JSON.stringify({

               formData

            })

         );

      }

      catch(error){

         console.log(
            "Storage Full"
         );

      }

   },[formData]);

   // HANDLE CHANGE

   const handleChange = (e)=>{

      setFormData({

         ...formData,

         [e.target.name]:
         e.target.value

      });

   };

   // FEATURE IMAGE

   const handleFeatureImage = (e)=>{

      const file =
      e.target.files[0];

      if(!file) return;

      setFeatureImage(file);

      const reader =
      new FileReader();

      reader.onloadend = ()=>{

         setFeaturePreview(
            reader.result
         );

      };

      reader.readAsDataURL(file);

   };

   // OG IMAGE

   const handleOgImage = (e)=>{

      const file =
      e.target.files[0];

      if(!file) return;

      setOgImage(file);

      const reader =
      new FileReader();

      reader.onloadend = ()=>{

         setOgPreview(
            reader.result
         );

      };

      reader.readAsDataURL(file);

   };

   // PREVIEW BLOG

   const handlePreview = ()=>{

      navigate(

         "/preview-blog",

         {

            state:{

               formData,
               featurePreview,
               ogPreview

            }

         }

      );

   };

   // CREATE BLOG

   const handleSubmit = async(e)=>{

      e.preventDefault();

      try{

         setLoading(true);

         const blogData =
         new FormData();

         // TEXT FIELDS

         Object.keys(formData)
         .forEach((key)=>{

            blogData.append(

               key,

               formData[key]

            );

         });

         // FEATURE IMAGE

         if(featureImage){

            blogData.append(

               "featureImage",

               featureImage

            );

         }

         // OG IMAGE

         if(ogImage){

            blogData.append(

               "ogImage",

               ogImage

            );

         }

         const response =
         await axios.post(

            "http://localhost:5000/api/blogs/create",

            blogData,

            {

               headers:{

                  Authorization:
                  `Bearer ${token}`,

                  "Content-Type":
                  "multipart/form-data"

               }

            }

         );

         console.log(response.data);

         alert(
            "Blog Created Successfully"
         );

         // CLEAR STORAGE

         localStorage.removeItem(
            "previewBlog"
         );

         navigate("/blogs");

      }

      catch(error){

         console.log(error);

         alert(

            error?.response?.data?.message

            ||

            "Blog Creation Failed"

         );

      }

      finally{

         setLoading(false);

      }

   };

   return(

      <div className="max-w-7xl mx-auto py-10 px-4">

         <div className="bg-white rounded-[35px] shadow-xl p-8 md:p-12">

            {/* TOP */}

            <div className="mb-10">

               <h1 className="text-5xl font-bold text-gray-900">

                  Create Blog

               </h1>

               <p className="text-gray-500 mt-3 text-lg">

                  Create SEO optimized blog content with advanced metadata

               </p>

            </div>

            <form

               onSubmit={handleSubmit}

               className="space-y-10"

            >

               {/* TITLE */}

               <div>

                  <label className="block text-lg font-semibold mb-3">

                     Blog Title

                  </label>

                  <input

                     type="text"

                     name="title"

                     placeholder="Enter blog title"

                     value={formData.title}

                     onChange={handleChange}

                     required

                     className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500"

                  />

               </div>

               {/* CONTENT */}

               <div>

                  <label className="block text-lg font-semibold mb-3">

                     Blog Content

                  </label>

                  <textarea

                     name="content"

                     rows="10"

                     placeholder="Write your content..."

                     value={formData.content}

                     onChange={handleChange}

                     required

                     className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500"

                  />

               </div>

               {/* META */}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>

                     <label className="block text-lg font-semibold mb-3">

                        Meta Title

                     </label>

                     <input

                        type="text"

                        name="metaTitle"

                        placeholder="Meta title"

                        value={formData.metaTitle}

                        onChange={handleChange}

                        className="w-full border border-gray-200 rounded-2xl px-6 py-4"

                     />

                  </div>

                  <div>

                     <label className="block text-lg font-semibold mb-3">

                        Meta Description

                     </label>

                     <input

                        type="text"

                        name="metaDescription"

                        placeholder="Meta description"

                        value={formData.metaDescription}

                        onChange={handleChange}

                        className="w-full border border-gray-200 rounded-2xl px-6 py-4"

                     />

                  </div>

               </div>

               {/* CANONICAL */}

               <div>

                  <label className="block text-lg font-semibold mb-3">

                     Canonical URL

                  </label>

                  <input

                     type="text"

                     name="canonicalUrl"

                     placeholder="Canonical URL"

                     value={formData.canonicalUrl}

                     onChange={handleChange}

                     className="w-full border border-gray-200 rounded-2xl px-6 py-4"

                  />

               </div>

               {/* IMAGES */}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* FEATURE IMAGE */}

                  <div>

                     <h3 className="font-bold mb-4 text-xl">

                        Feature Image

                     </h3>

                     <label className="border-2 border-dashed border-gray-300 rounded-3xl h-72 flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-indigo-500 transition">

                        {

                           featurePreview

                           ?

                           (

                              <img

                                 src={featurePreview}

                                 alt="preview"

                                 className="w-full h-full object-cover"

                              />

                           )

                           :

                           (

                              <>

                                 <div className="text-6xl mb-4">

                                    ☁️

                                 </div>

                                 <p className="text-gray-500">

                                    Upload Feature Image

                                 </p>

                              </>

                           )

                        }

                        <input

                           type="file"

                           hidden

                           accept="image/*"

                           onChange={handleFeatureImage}

                        />

                     </label>

                  </div>
                  

                  {/* OG IMAGE */}

                  <div className="space-y-5">
 <label
      className="block text-lg font-semibold mb-3 text-gray-800"
   >

      Open Graph Title

   </label>
                     <input

                        type="text"

                        name="ogTitle"

                        placeholder="OG Title"

                        value={formData.ogTitle}

                        onChange={handleChange}

                        className="w-full border border-gray-200 rounded-2xl px-6 py-4"

                     />
 <label
      className="block text-lg font-semibold mb-3 text-gray-800"
   >

      Open Graph Description

   </label>
                     <textarea

                        name="ogDescription"

                        rows="4"

                        placeholder="OG Description"

                        value={formData.ogDescription}

                        onChange={handleChange}

                        className="w-full border border-gray-200 rounded-2xl px-6 py-4"

                     />
<h3 className="font-bold mb-4 text-xl">

   OG Image

</h3>
                     <label className="border-2 border-dashed border-gray-300 rounded-3xl h-44 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-indigo-500 transition">

                        {

                           ogPreview

                           ?

                           (

                              <img

                                 src={ogPreview}

                                 alt="og"

                                 className="w-full h-full object-cover"

                              />

                           )

                           :

                           (
                              

                              <p className="text-gray-500">

                                 Upload OG Image

                              </p>

                           )

                        }

                        <input

                           type="file"

                           hidden

                           accept="image/*"

                           onChange={handleOgImage}

                        />

                     </label>

                  </div>

               </div>{/* EXTRA SEO */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

   {/* LEFT */}

   <div className="space-y-6">

      {/* TWITTER TITLE */}

      <div>

         <label className="block text-lg font-semibold mb-3 text-gray-800">

            Twitter SEO Title

         </label>

         <input

            type="text"

            name="twitterTitle"

            placeholder="Twitter SEO Title"

            value={formData.twitterTitle}

            onChange={handleChange}

            className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"

         />

      </div>

      {/* TWITTER DESCRIPTION */}

      <div>

         <label className="block text-lg font-semibold mb-3 text-gray-800">

            Twitter SEO Description

         </label>

         <textarea

            name="twitterDescription"

            rows="4"

            placeholder="Twitter SEO Description"

            value={formData.twitterDescription}

            onChange={handleChange}

            className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"

         />

      </div>

      {/* FAQ QUESTION */}

      <div>

         <label className="block text-lg font-semibold mb-3 text-gray-800">

            FAQ Question

         </label>

         <input

            type="text"

            name="faqQuestion"

            placeholder="FAQ Question"

            value={formData.faqQuestion}

            onChange={handleChange}

            className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"

         />

      </div>

      {/* FAQ ANSWER */}

      <div>

         <label className="block text-lg font-semibold mb-3 text-gray-800">

            FAQ Answer

         </label>

         <textarea

            name="faqAnswer"

            rows="4"

            placeholder="FAQ Answer"

            value={formData.faqAnswer}

            onChange={handleChange}

            className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"

         />

      </div>

   </div>

   {/* RIGHT */}

   <div className="space-y-6">

      {/* TAGS */}

      <div>

         <label className="block text-lg font-semibold mb-3 text-gray-800">

            Tags

         </label>

         <input

            type="text"

            name="tags"

            placeholder="Tags (comma separated)"

            value={formData.tags}

            onChange={handleChange}

            className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"

         />

      </div>

      {/* CATEGORIES */}

      <div>

         <label className="block text-lg font-semibold mb-3 text-gray-800">

            Categories

         </label>

         <input

            type="text"

            name="categories"

            placeholder="Categories (comma separated)"

            value={formData.categories}

            onChange={handleChange}

            className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"

         />

      </div>

      {/* INTERNAL LINKS */}

      <div>

         <label className="block text-lg font-semibold mb-3 text-gray-800">

            Internal Links

         </label>

         <textarea

            name="internalLinks"

            rows="4"

            placeholder="Internal Links"

            value={formData.internalLinks}

            onChange={handleChange}

            className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"

         />

      </div>

      {/* EXTERNAL LINKS */}

      <div>

         <label className="block text-lg font-semibold mb-3 text-gray-800">

            External Links

         </label>

         <textarea

            name="externalLinks"

            rows="4"

            placeholder="External Links"

            value={formData.externalLinks}

            onChange={handleChange}

            className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"

         />

      </div>

   </div>

</div>

               {/* FOOTER */}

               <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-8 border-t border-gray-100">

                  {/* STATUS */}

                  <div className="w-full lg:w-72">

                     <label className="block text-lg font-semibold text-gray-800 mb-3">

                        Publish Status

                     </label>

                     <select

                        name="status"

                        value={formData.status}

                        onChange={handleChange}

                        className="w-full border border-gray-200 rounded-2xl px-6 py-4 bg-white outline-none focus:border-indigo-500"

                     >

                        <option value="published">

                           Publish Now

                        </option>

                        <option value="draft">

                           Save As Draft

                        </option>

                     </select>

                  </div>

                  {/* BUTTONS */}

                  <div className="flex flex-wrap gap-4">

                     {/* PREVIEW */}

                     <button

                        type="button"

                        onClick={handlePreview}

                        className="border border-indigo-500 text-indigo-600 px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-50 transition"

                     >

                        Preview Blog

                     </button>

                     {/* SUBMIT */}

                     <button

                        type="submit"

                        disabled={loading}

                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg hover:opacity-90 transition"

                     >

                        {

                           loading

                           ?

                           "Processing..."

                           :

                           formData.status === "draft"

                           ?

                           "Save Draft"

                           :

                           "Publish Blog"

                        }

                     </button>

                  </div>

               </div>

            </form>

         </div>

      </div>

   );

}

export default CreateBlog;