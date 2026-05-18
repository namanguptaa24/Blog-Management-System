import {

   useEffect,
   useState

} from "react";

import {

   useNavigate

} from "react-router-dom";

import API from "../services/api";

import {

   Search

} from "lucide-react";

function SearchBar(){

   const navigate =
   useNavigate();

   const [query,setQuery] =
   useState("");

   const [blogs,setBlogs] =
   useState([]);

   const [filtered,setFiltered] =
   useState([]);

   const [showResults,setShowResults] =
   useState(false);

   // FETCH BLOGS

   useEffect(()=>{

      fetchBlogs();

   },[]);

   const fetchBlogs = async()=>{

      try{

         const res =
         await API.get("/blogs");

         setBlogs(res.data);

      }

      catch(error){

         console.log(error);

      }

   };

   // LIVE FILTER

   useEffect(()=>{

      if(!query.trim()){

         setFiltered([]);

         return;

      }

      const results =
      blogs.filter((blog)=>{

         const title =
         blog.title
         ?.toLowerCase()
         || "";

         const tags =
         blog.tags
         ?.join(" ")
         ?.toLowerCase()
         || "";

         const categories =
         blog.categories
         ?.join(" ")
         ?.toLowerCase()
         || "";

         return(

            title.includes(
               query.toLowerCase()
            )

            ||

            tags.includes(
               query.toLowerCase()
            )

            ||

            categories.includes(
               query.toLowerCase()
            )

         );

      });

      setFiltered(

         results.slice(0,6)

      );

   },[query,blogs]);

   return(

      <div className="relative w-full max-w-2xl mx-auto">

         {/* INPUT */}

         <div className="relative">

            <Search

               className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"

               size={22}

            />

            <input

               type="text"

               placeholder="Search blogs, tags, categories..."

               value={query}

               onChange={(e)=>{

                  setQuery(
                     e.target.value
                  );

                  setShowResults(true);

               }}

               onFocus={()=>{

                  setShowResults(true);

               }}

               className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-5 py-5 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"

            />

         </div>

         {/* RESULTS */}

         {

            showResults

            &&

            query.trim()

            &&

            (

               <div className="absolute top-full mt-3 left-0 w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50">

                  {

                     filtered.length > 0

                     ?

                     filtered.map((blog)=>(

                        <div

                           key={blog._id}

                           onClick={()=>{

                              navigate(

                                 `/blog/${blog.slug}`

                              );

                              setShowResults(false);

                              setQuery("");

                           }}

                           className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition border-b border-gray-100"

                        >

                           {/* IMAGE */}

                           <img

                              src={blog.featureImage}

                              alt={blog.title}

                              className="w-20 h-16 object-cover rounded-xl"

                           />

                           {/* CONTENT */}

                           <div>

                              <h3 className="font-semibold text-gray-900 line-clamp-1">

                                 {blog.title}

                              </h3>

                              <p className="text-sm text-gray-500 mt-1 line-clamp-1">

                                 {

                                    blog.metaDescription

                                 }

                              </p>

                           </div>

                        </div>

                     ))

                     :

                     <div className="p-6 text-center text-gray-500">

                        No matching blogs found

                     </div>

                  }

               </div>

            )

         }

      </div>

   );

}

export default SearchBar;