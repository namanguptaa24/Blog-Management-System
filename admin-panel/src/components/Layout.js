import { Link, Outlet, useLocation } from "react-router-dom";

function Layout() {

   const location = useLocation();

   const user = JSON.parse(
   localStorage.getItem("user")
);

const menuItems = [

   {
      name:"Dashboard",
      path:"/dashboard"
   },

   {
      name:"Create Blog",
      path:"/create-blog"
   },

   {
      name:"View Blogs",
      path:"/blogs"
   },

   {
      name:"Draft Blogs",
      path:"/drafts"
   }

];

if(user?.role === "SUPER_ADMIN"){

   menuItems.push({

      name:"Users",
      path:"/users"

   });

}

   return(

      <div className="flex min-h-screen bg-gray-100">

         {/* Sidebar */}

         <div className="w-72 bg-gradient-to-b from-black to-gray-900 text-white p-6 shadow-2xl">

            <h1 className="text-3xl font-bold mb-12">

               Blog Platform

            </h1>

            <div className="space-y-4">

               {

                  menuItems.map((item,index)=>(

                     <Link

                        key={index}

                        to={item.path}

                        className={`

                           block

                           px-5

                           py-4

                           rounded-xl

                           font-semibold

                           transition

                           duration-300

                           ${

                              location.pathname === item.path

                              ?

                              "bg-blue-600 shadow-lg"

                              :

                              "hover:bg-gray-800"

                           }

                        `}

                     >

                        {item.name}

                     </Link>

                  ))

               }

            </div>

            <button

               className="mt-16 w-full bg-red-500 hover:bg-red-600 transition duration-300 py-3 rounded-xl font-semibold"

               onClick={()=>{

                  localStorage.clear();

                  window.location.href="/";

               }}

            >

               Logout

            </button>

         </div>

         {/* Main Content */}

         <div className="flex-1 p-10 overflow-y-auto">

            <Outlet />

         </div>

      </div>

   );

}

export default Layout;