import Navbar from
"../components/Navbar";

import Footer from
"../components/Footer";

function About(){

   return(

      <div className="bg-[#f5f7fb] min-h-screen">

         <Navbar />

         {/* HERO */}

         <section className="pt-28 pb-20">

            <div className="max-w-7xl mx-auto px-6">

               <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-[40px] p-10 md:p-16 text-white shadow-2xl">

                  <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full text-sm font-semibold mb-8">

                     🚀 About Platform

                  </div>

                  <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">

                     Modern Developer Blogging Platform
                  </h1>

                  {/* <p className="text-xl text-indigo-100 leading-10 max-w-4xl">

                     A modern MERN stack blogging platform focused on SEO optimization, scalable architecture, developer experience, and premium content publishing.

                  </p> */}

               </div>

            </div>

         </section>

         {/* CONTENT */}

         <section className="pb-24">

            <div className="max-w-7xl mx-auto px-6">

               <div className="grid lg:grid-cols-2 gap-10">

                  {/* LEFT */}

                  <div className="bg-white rounded-[35px] p-10 shadow-lg border border-gray-100">

                     <h2 className="text-4xl font-bold text-gray-900 mb-8">

                        Our Mission

                     </h2>

                     <p className="text-gray-600 text-lg leading-10 mb-8">

                        This platform was built to share practical development knowledge, real-world tutorials, and scalable engineering concepts for modern web developers.

                     </p>

                     <p className="text-gray-600 text-lg leading-10">

                        From frontend architecture to backend scalability, authentication, SEO optimization, and deployment strategies — the goal is to help developers build production-ready applications.

                     </p>

                  </div>

                  {/* RIGHT */}

                  <div className="bg-white rounded-[35px] p-10 shadow-lg border border-gray-100">

                     <h2 className="text-4xl font-bold text-gray-900 mb-8">

                        Tech Stack

                     </h2>

                     <div className="grid grid-cols-2 gap-5">

                        {

                           [

                              "React.js",
                              "Node.js",
                              "Express.js",
                              "MongoDB",
                              "JWT Auth",
                              "Tailwind CSS",
                              "Cloudinary",
                              "SEO Optimization"

                           ].map((tech,index)=>(

                              <div

                                 key={index}

                                 className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5 text-center font-semibold text-gray-800"

                              >

                                 {tech}

                              </div>

                           ))

                        }

                     </div>

                  </div>

               </div>

               {/* FEATURES */}

               <div className="mt-10 bg-white rounded-[35px] p-10 shadow-lg border border-gray-100">

                  <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">

                     Platform Features

                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                     {

                        [

                           {

                              title:"SEO Optimized",

                              desc:"Structured metadata, canonical URLs, Open Graph SEO, and scalable indexing."

                           },

                           {

                              title:"Role Based Access",

                              desc:"Super Admin, Editor, Author, and Viewer permission management."

                           },

                           {

                              title:"Image Uploads",

                              desc:"Cloudinary-powered optimized media uploads and delivery."

                           },

                           {

                              title:"Responsive Design",

                              desc:"Fully responsive premium UI optimized for all screen sizes."

                           },

                           {

                              title:"Search & Filtering",

                              desc:"Advanced search system with categories, tags, and author filtering."

                           },

                           {

                              title:"Modern Architecture",

                              desc:"Production-ready MERN stack architecture and clean API structure."

                           }

                        ].map((feature,index)=>(

                           <div

                              key={index}

                              className="bg-[#f5f7fb] rounded-3xl p-8 border border-gray-100"

                           >

                              <h3 className="text-2xl font-bold text-gray-900 mb-4">

                                 {feature.title}

                              </h3>

                              <p className="text-gray-600 leading-8">

                                 {feature.desc}

                              </p>

                           </div>

                        ))

                     }

                  </div>

               </div>

            </div>

         </section>

         <Footer />

      </div>

   );

}

export default About;