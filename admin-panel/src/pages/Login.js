import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Login(){

   const navigate = useNavigate();

   const [formData,setFormData] = useState({

      email:"",
      password:""

   });

   const handleChange = (e) => {

      setFormData({

         ...formData,

         [e.target.name]:e.target.value

      });

   };

   const handleSubmit = async(e) => {

      e.preventDefault();

      try{

         const res = await API.post(

            "/auth/login",

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

         alert("Login Success");

         navigate("/dashboard");

      }catch(error){

         console.log(error);

         alert(

            error.response?.data?.message ||

            "Wrong Email or Password"

         );

      }

   };

   return(

      <div>

         <h1>Login</h1>

         <form onSubmit={handleSubmit}>

            <input
               type="email"
               name="email"
               placeholder="Email"
               onChange={handleChange}
            />

            <br /><br />

            <input
               type="password"
               name="password"
               placeholder="Password"
               onChange={handleChange}
            />

            <br /><br />

            <button type="submit">
               Login
            </button>

            <br /><br />

            <button
               type="button"
               onClick={() =>
                  navigate("/register")
               }
            >
               Register
            </button>

         </form>

      </div>

   );

}

export default Login;