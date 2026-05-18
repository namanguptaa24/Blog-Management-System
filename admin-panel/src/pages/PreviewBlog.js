import {

   useLocation,
   useNavigate

} from "react-router-dom";

function PreviewBlog(){

   const location =
   useLocation();

   const navigate =
   useNavigate();

   // GET PREVIEW DATA

   const previewData =

      location.state

      ||

      JSON.parse(

         localStorage.getItem(
            "previewBlog"
         )

      );

   // SAFE DATA

   const formData =

      previewData?.formData

      ||

      {};

   const featurePreview =

      previewData?.featurePreview

      ||

      "";

   const ogPreview =

      previewData?.ogPreview

      ||

      "";

   // NO DATA

   if(!previewData){

      return(

         <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full">

               <h1 className="text-4xl font-bold text-gray-900 mb-4">

                  No Preview Data Found

               </h1>

               <p className="text-gray-500 text-lg mb-8">

                  Please create a blog first.

               </p>

               <button

                  onClick={()=>

                     navigate("/create-blog")

                  }

                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition"

               >

                  Go To Create Blog

               </button>

            </div>

         </div>

      );

   }

   // CLEAN TEXT

   const cleanText = (text)=>{

      if(!text) return "";

      return text.replace(

         /[\[\]"]/g,

         ""

      );

   };

   // EDIT BLOG

   const handleEdit = ()=>{

      navigate("/create-blog");

   };

   // READY TO PUBLISH

   const handlePublish = ()=>{

      navigate("/create-blog");

   };

   return(

      <div className="min-h-screen bg-gray-100 py-10 px-4">

         <div className="max-w-6xl mx-auto">

            {/* TOP */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

               <div>

                  <h1 className="text-5xl font-bold text-gray-900">

                     Blog Preview

                  </h1>

                  <p className="text-gray-500 mt-3 text-lg">

                     Final preview before publishing your blog

                  </p>

               </div>

               <button

                  onClick={handleEdit}

                  className="bg-black text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition"

               >

                  Back To Edit

               </button>

            </div>

            {/* BLOG CARD */}

            <div className="bg-white rounded-[35px] shadow-xl overflow-hidden">

               {/* FEATURE IMAGE */}

               {

                  featurePreview

                  &&

                  (

                     <div className="w-full h-[450px] overflow-hidden">

                        <img

                           src={featurePreview}

                           alt="preview"

                           className="w-full h-full object-cover"

                        />

                     </div>

                  )

               }

               {/* CONTENT */}

               <div className="p-8 md:p-14">

                  {/* CATEGORIES */}

                  {

                     formData.categories

                     &&

                     (

                        <div className="flex flex-wrap gap-3 mb-6">

                           {

                              formData.categories

                              ?.split(",")

                              ?.map((category,index)=>(

                                 <span

                                    key={index}

                                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold"

                                 >

                                    {

                                       cleanText(category)

                                    }

                                 </span>

                              ))

                           }

                        </div>

                     )

                  }

                  {/* TITLE */}

                  <h1 className="text-5xl font-bold leading-tight text-gray-900 mb-6">

                     {

                        formData.title

                     }

                  </h1>

                  {/* META */}

                  <div className="flex flex-wrap gap-4 text-gray-500 mb-10">

                     <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                        {

                           formData.status === "draft"

                           ?

                           "Draft"

                           :

                           "Published"

                        }

                     </span>

                     <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">

                        SEO Optimized

                     </span>

                     <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">

                        Canonical Ready

                     </span>

                  </div>

                  {/* META DESCRIPTION */}

                  {

                     formData.metaDescription

                     &&

                     (

                        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 mb-10">

                           <h2 className="text-2xl font-bold mb-4">

                              Meta Description

                           </h2>

                           <p className="text-gray-700 leading-8 text-lg">

                              {

                                 formData.metaDescription

                              }

                           </p>

                        </div>

                     )

                  }

                  {/* BLOG CONTENT */}

                  <div className="mb-12">

                     <h2 className="text-3xl font-bold mb-6">

                        Blog Content

                     </h2>

                     <div className="text-gray-700 leading-9 text-lg whitespace-pre-wrap">

                        {

                           formData.content

                        }

                     </div>

                  </div>

                  {/* TAGS */}

                  {

                     formData.tags

                     &&

                     (

                        <div className="mb-12">

                           <h2 className="text-3xl font-bold mb-6">

                              Tags

                           </h2>

                           <div className="flex flex-wrap gap-3">

                              {

                                 formData.tags

                                 ?.split(",")

                                 ?.map((tag,index)=>(

                                    <span

                                       key={index}

                                       className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full font-medium"

                                    >

                                       #

                                       {

                                          cleanText(tag)

                                       }

                                    </span>

                                 ))

                              }

                           </div>

                        </div>

                     )

                  }

                  {/* FAQ */}

                  {

                     formData.faqQuestion

                     &&

                     (

                        <div className="mb-12">

                           <h2 className="text-3xl font-bold mb-6">

                              FAQ

                           </h2>

                           <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8">

                              <h3 className="text-2xl font-bold text-gray-900 mb-4">

                                 {

                                    formData.faqQuestion

                                 }

                              </h3>

                              <p className="text-gray-700 leading-8 text-lg">

                                 {

                                    formData.faqAnswer

                                 }

                              </p>

                           </div>

                        </div>

                     )

                  }

                  {/* SEO SECTION */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                     {/* OG SEO */}

                     <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">

                        <h2 className="text-2xl font-bold mb-6">

                           Open Graph SEO

                        </h2>

                        <div className="space-y-4">

                           <p>

                              <span className="font-bold">

                                 OG Title:

                              </span>

                              {" "}

                              {

                                 formData.ogTitle

                              }

                           </p>

                           <p>

                              <span className="font-bold">

                                 OG Description:

                              </span>

                              {" "}

                              {

                                 formData.ogDescription

                              }

                           </p>

                           {

                              ogPreview

                              &&

                              (

                                 <img

                                    src={ogPreview}

                                    alt="og"

                                    className="w-full h-60 object-cover rounded-2xl mt-5"

                                 />

                              )

                           }

                        </div>

                     </div>

                     {/* TWITTER SEO */}

                     <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">

                        <h2 className="text-2xl font-bold mb-6">

                           Twitter SEO

                        </h2>

                        <div className="space-y-4">

                           <p>

                              <span className="font-bold">

                                 Twitter Title:

                              </span>

                              {" "}

                              {

                                 formData.twitterTitle

                              }

                           </p>

                           <p>

                              <span className="font-bold">

                                 Twitter Description:

                              </span>

                              {" "}

                              {

                                 formData.twitterDescription

                              }

                           </p>

                        </div>

                     </div>

                  </div>

                  {/* INTERNAL LINKS */}

                  {

                     formData.internalLinks

                     &&

                     (

                        <div className="mt-12 bg-gray-50 border border-gray-100 rounded-3xl p-8">

                           <h2 className="text-2xl font-bold mb-4">

                              Internal Links

                           </h2>

                           <p className="text-gray-700 leading-8">

                              {

                                 formData.internalLinks

                              }

                           </p>

                        </div>

                     )

                  }

                  {/* EXTERNAL LINKS */}

                  {

                     formData.externalLinks

                     &&

                     (

                        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-3xl p-8">

                           <h2 className="text-2xl font-bold mb-4">

                              External Links

                           </h2>

                           <p className="text-gray-700 leading-8">

                              {

                                 formData.externalLinks

                              }

                           </p>

                        </div>

                     )

                  }

                  {/* BUTTONS */}

                  <div className="mt-14 flex flex-wrap gap-5">

                     {/* READY TO PUBLISH */}

                     <button

                        onClick={handlePublish}

                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:opacity-90 transition"

                     >

                        Ready To Publish

                     </button>

                     {/* EDIT */}

                     <button

                        onClick={handleEdit}

                        className="border border-gray-300 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition"

                     >

                        Edit Blog

                     </button>

                  </div>

               </div>

            </div>

         </div>

      </div>

   );

}

export default PreviewBlog;