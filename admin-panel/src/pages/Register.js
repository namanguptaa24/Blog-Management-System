import { useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

function Register(){

   const navigate = useNavigate();

   const [formData,setFormData] = useState({

      name:"",
      email:"",
      password:"",
      role:"AUTHOR"

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

         await API.post(
            "/auth/register",
            formData
         );

         alert("Registration Success");

         navigate("/");

      }catch(error){

         console.log(error);

      }

   };

   return(

      <div>

         <h1>Register</h1>

         <form onSubmit={handleSubmit}>

            <input
               type="text"
               name="name"
               placeholder="Name"
               onChange={handleChange}
            />

            <br /><br />

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

            <select
               name="role"
               onChange={handleChange}
            >

               <option value="AUTHOR">
                  AUTHOR
               </option>

               <option value="VIEWER">
                  VIEWER
               </option>

            </select>

            <br /><br />

            <button type="submit">
               Register
            </button>

         </form>

      </div>

   );

}

export default Register;