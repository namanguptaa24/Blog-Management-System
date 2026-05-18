import {

   Link

} from "react-router-dom";

function FeaturedBlog({ blog }){

   if(!blog) return null;

   return(

      <div className="relative rounded-[40px] overflow-hidden h-[650px] shadow-2xl">

         {/* IMAGE */}

         <img

            src={blog.featureImage}

            alt={blog.title}

            className="w-full h-full object-cover"

         />

         {/* OVERLAY */}

         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

         {/* CONTENT */}

         <div className="absolute bottom-0 left-0 p-10 md:p-16 text-white max-w-4xl">

            {/* CATEGORY */}

            {

               blog.categories?.[0]

               &&

               (

                  <span className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold">

                     {

                        blog.categories[0]

                     }

                  </span>

               )

            }

            {/* TITLE */}

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mt-6 mb-6">

               {blog.title}

            </h1>

            {/* DESCRIPTION */}

            <p className="text-xl text-gray-200 leading-9 mb-8">

               {

                  blog.metaDescription

               }

            </p>

            {/* BUTTON */}

            <Link

               to={`/blog/${blog.slug}`}

               className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"

            >

               Read Full Article

            </Link>

         </div>

      </div>

   );

}

export default FeaturedBlog;