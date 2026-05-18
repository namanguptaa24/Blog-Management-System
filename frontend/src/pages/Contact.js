import {
   useState
} from "react";

import Navbar from
"../components/Navbar";

import Footer from
"../components/Footer";

function Contact(){

   const [formData,setFormData] =
   useState({

      name:"",
      email:"",
      subject:"",
      message:""

   });

   const [success,setSuccess] =
   useState(false);

   // HANDLE CHANGE

   const handleChange = (e)=>{

      setFormData({

         ...formData,

         [e.target.name]:
         e.target.value

      });

   };

   // HANDLE SUBMIT

   const handleSubmit = (e)=>{

      e.preventDefault();

      console.log(formData);

      setSuccess(true);

      setFormData({

         name:"",
         email:"",
         subject:"",
         message:""

      });

      setTimeout(()=>{

         setSuccess(false);

      },3000);

   };

   return(

      <div className="bg-[#f5f7fb] min-h-screen">

         <Navbar />

         {/* HERO */}

         <section className="pt-28 pb-20">

            <div className="max-w-7xl mx-auto px-6">

               <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 rounded-[40px] p-10 md:p-16 text-white shadow-2xl">

                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full text-sm font-semibold mb-8">

                     📩 Contact Us

                  </div>

                  <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">

                     Let’s Connect

                  </h1>

                  <p className="text-xl text-gray-300 leading-10 max-w-4xl">

                     Have questions, feedback, collaboration ideas, or technical discussions? Feel free to reach out anytime.

                  </p>

               </div>

            </div>

         </section>

         {/* CONTENT */}

         <section className="pb-24">

            <div className="max-w-7xl mx-auto px-6">

               <div className="grid lg:grid-cols-2 gap-10">

                  {/* LEFT */}

                  <div className="bg-white rounded-[35px] p-10 shadow-lg border border-gray-100">

                     <h2 className="text-4xl font-bold text-gray-900 mb-10">

                        Get In Touch

                     </h2>

                     <div className="space-y-8">

                        {/* Name */}

                        <div>

                           <p className="text-gray-500 text-sm mb-2">

                              Name

                           </p>

                           <h3 className="text-2xl font-semibold text-gray-900 break-all">

                              Naman Gupta

                           </h3>

                        </div>
                         {/* EMAIL */}

                        <div>

                           <p className="text-gray-500 text-sm mb-2">

                              Email

                           </p>

                           <h3 className="text-2xl font-semibold text-gray-900 break-all">

                              namanguptaa24@gmail.com

                           </h3>

                        </div>

                        {/* LOCATION */}

                        <div>

                           <p className="text-gray-500 text-sm mb-2">

                              Location

                           </p>

                           <h3 className="text-2xl font-semibold text-gray-900">

                              Alwar, Rajasthan, India

                           </h3>

                        </div>

                        {/* EXPERTISE */}

                        {/* <div>

                           <p className="text-gray-500 text-sm mb-2">

                              Expertise

                           </p>

                           <h3 className="text-2xl font-semibold text-gray-900 leading-10">

                              MERN Stack, AI, SEO, Full Stack Development

                           </h3>

                        </div> */}

                     </div>

                  </div>

                  {/* RIGHT */}

                  <div className="bg-white rounded-[35px] p-10 shadow-lg border border-gray-100">

                     <h2 className="text-4xl font-bold text-gray-900 mb-10">

                        Send Message

                     </h2>

                     <form

                        onSubmit={handleSubmit}

                        className="space-y-6"

                     >

                        {/* NAME */}

                        <input

                           type="text"

                           name="name"

                           value={formData.name}

                           onChange={handleChange}

                           placeholder="Your Name"

                           className="w-full bg-[#f5f7fb] border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500"

                           required

                        />

                        {/* EMAIL */}

                        <input

                           type="email"

                           name="email"

                           value={formData.email}

                           onChange={handleChange}

                           placeholder="Your Email"

                           className="w-full bg-[#f5f7fb] border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500"

                           required

                        />

                        {/* SUBJECT */}

                        <input

                           type="text"

                           name="subject"

                           value={formData.subject}

                           onChange={handleChange}

                           placeholder="Subject"

                           className="w-full bg-[#f5f7fb] border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500"

                           required

                        />

                        {/* MESSAGE */}

                        <textarea

                           rows="6"

                           name="message"

                           value={formData.message}

                           onChange={handleChange}

                           placeholder="Write your message..."

                           className="w-full bg-[#f5f7fb] border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500 resize-none"

                           required

                        />

                        {/* SUCCESS */}

                        {

                           success && (

                              <div className="bg-green-100 text-green-700 px-5 py-4 rounded-2xl font-medium">

                                 Message sent successfully.

                              </div>

                           )

                        }

                        {/* BUTTON */}

                        <button

                           type="submit"

                           className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold hover:scale-[1.01] transition"

                        >

                           Send Message

                        </button>

                     </form>

                  </div>

               </div>

            </div>

         </section>

         <Footer />

      </div>

   );

}

export default Contact;