import {

   useState

} from "react";

import {

   Link,
   useNavigate

} from "react-router-dom";

import axios from "axios";

import {

   FaEnvelope,
   FaLock,
   FaEye,
   FaEyeSlash

} from "react-icons/fa";

function Login(){

   const navigate = useNavigate();

   const [showPassword,setShowPassword] = useState(false);

   const [formData,setFormData] = useState({

      email:"",
      password:""

   });

   const handleChange = (e)=>{

      setFormData({

         ...formData,

         [e.target.name]:e.target.value

      });

   };

   const handleSubmit = async(e)=>{

      e.preventDefault();

      try{

         const res = await axios.post(

            "http://localhost:5000/api/auth/login",

            formData

         );

         localStorage.setItem(

            "token",
            res.data.token
         );

         localStorage.setItem(

            "user",
            JSON.stringify(res.data.user)
         );

         navigate("/dashboard");

      }

      catch(error){

         alert(

            error.response?.data?.message
            ||
            "Login Failed"

         );

      }

   };

   return(

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-white flex items-center justify-center px-6 py-10">

         <div className="max-w-6xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

            {/* Left Section */}

            <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-purple-100 p-16 relative overflow-hidden">

               <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300 opacity-20 rounded-full -translate-x-32 -translate-y-32">

               </div>

               <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 opacity-20 rounded-full translate-x-32 translate-y-32">

               </div>

               <div className="relative z-10 text-center">

                  <div className="flex items-center justify-center gap-3 mb-8">

                     {/* <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">

                        🙏

                     </div> */}

                     <h1 className="text-4xl font-bold text-gray-900">

Modern Blog Management System
                     </h1>

                  </div>

                  <h2 className="text-4xl font-bold text-gray-900 mb-4">

                     Welcome Back!

                  </h2>

                  <p className="text-gray-600 text-lg leading-8 max-w-md">

                     Login to manage blogs, users, SEO content and your publishing dashboard.

                  </p>

                  <img

                     src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

                     alt="login"

                     className="w-80 mx-auto mt-12"

                  />

               </div>

            </div>

            {/* Right Section */}

            <div className="flex items-center justify-center p-8 lg:p-16">

               <div className="w-full max-w-md">

                  <h2 className="text-4xl font-bold text-gray-900 mb-3">

                     Login

                  </h2>

                  <p className="text-gray-500 mb-10">

                     Enter your credentials to continue

                  </p>

                  <form
                     onSubmit={handleSubmit}
                     className="space-y-6"
                  >

                     {/* Email */}

                     <div>

                        <label className="block text-gray-700 font-medium mb-2">

                           Email

                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-indigo-500">

                           <FaEnvelope className="text-gray-400 mr-3" />

                           <input

                              type="email"

                              name="email"

                              placeholder="Enter your email"

                              value={formData.email}

                              onChange={handleChange}

                              className="w-full outline-none"

                              required

                           />

                        </div>

                     </div>

                     {/* Password */}

                     <div>

                        <label className="block text-gray-700 font-medium mb-2">

                           Password

                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-indigo-500">

                           <FaLock className="text-gray-400 mr-3" />

                           <input

                              type={

                                 showPassword
                                 ?
                                 "text"
                                 :
                                 "password"

                              }

                              name="password"

                              placeholder="Enter your password"

                              value={formData.password}

                              onChange={handleChange}

                              className="w-full outline-none"

                              required

                           />

                           <button

                              type="button"

                              onClick={()=>setShowPassword(!showPassword)}

                              className="text-gray-400"

                           >

                              {

                                 showPassword
                                 ?
                                 <FaEyeSlash />
                                 :
                                 <FaEye />

                              }

                           </button>

                        </div>

                     </div>

                     {/* Remember */}

                     <div className="flex items-center justify-between text-sm">

                        <label className="flex items-center gap-2 text-gray-600">

                           <input type="checkbox" />

                           Remember me

                        </label>

                        <button
                           type="button"
                           className="text-indigo-600 font-medium"
                        >

                           Forgot password?

                        </button>

                     </div>

                     {/* Submit */}

                     <button

                        type="submit"

                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition duration-300 shadow-lg"

                     >

                        Login

                     </button>

                  </form>

                  {/* Register */}

                  <p className="text-center text-gray-600 mt-8">

                     Don’t have an account?

                     <Link

                        to="/register"

                        className="text-indigo-600 font-semibold ml-2"

                     >

                        Register

                     </Link>

                  </p>

               </div>

            </div>

         </div>

      </div>

   );

}

export default Login;