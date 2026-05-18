import { useState } from "react";

import { Link } from "react-router-dom";

// import ThemeToggle from "./ThemeToggle";
function Navbar(){

   const [menuOpen,setMenuOpen] =
   useState(false);

   return(

      <nav
         className="bg-black text-white shadow-lg"
      >

         <div
            className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center"
         >

            <Link
               to="/"
               className="text-2xl font-bold"
            >

               Blog Platform

            </Link>

            <button

               className="md:hidden text-3xl"

               onClick={()=>setMenuOpen(!menuOpen)}

            >

               ☰

            </button>

            <div
               className="hidden md:flex gap-8 text-lg"
            >

               <Link to="/">
                  Home
               </Link>

               <Link to="/about">
                  About
               </Link>

               <Link to="/contact">
                  Contact
               </Link>
               {/* <Link to="/ThemeToggle">
                  ThemeToggle 
               </Link> */}

            </div>

         </div>

         {

            menuOpen && (

               <div
                  className="md:hidden flex flex-col px-6 pb-4 gap-4 bg-black"
               >

                  <Link to="/">
                     Home
                  </Link>

                  <Link to="/about">
                     About
                  </Link>

                  <Link to="/contact">
                     Contact
                  </Link>

               </div>

            )

         }

      </nav>

   );

}

export default Navbar;