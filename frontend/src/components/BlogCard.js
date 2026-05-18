import {

   Link

} from "react-router-dom";

function BlogCard({ blog }){

   const cleanText = (text)=>{

      return text
      ?.replace(/,/g,"")
      ?.trim();

   };

   return(

      <div className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition duration-500 border border-gray-100 flex flex-col h-full">

         {/* IMAGE */}

         <Link
            to={`/blog/${blog.slug}`}
            className="overflow-hidden"
         >

            <img

               src={blog.featureImage}

               alt={blog.title}

               className="w-full h-[240px] object-cover group-hover:scale-105 transition duration-700"

            />

         </Link>

         {/* CONTENT */}

         <div className="p-7 flex flex-col flex-1">

         {/* CATEGORIES */}

<div className="flex flex-wrap gap-2 mb-5">

   {

      blog.categories
      ?.slice(0,4)
      .map((category,index)=>(

         <Link

            key={index}

            to={`/category/${cleanText(category)}`}

            className="inline-block bg-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full hover:bg-indigo-200 transition"

         >

            {

               cleanText(category)

            }

         </Link>

      ))

   }

</div>
            {/* TITLE */}

            <Link

               to={`/blog/${blog.slug}`}

               className="block"

            >

               <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-indigo-600 transition line-clamp-2">

                  {blog.title}

               </h2>

            </Link>

            {/* DESCRIPTION */}

            <p className="text-gray-500 leading-8 text-[15px] line-clamp-3 mb-6">

               {

                  blog.metaDescription

               }

            </p>

            {/* TAGS */}

           <div className="flex flex-wrap gap-2 mt-5">

   {

      blog.tags
      ?.slice(0,5)
      .map((tag,index)=>(

         <span

            key={index}

            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"

         >

            #

            {tag}

         </span>

      ))

   }

</div>

            {/* SPACER */}

            <div className="flex-1"></div>

            {/* FOOTER */}

            <div className="flex items-center justify-between pt-6 border-t border-gray-100">

               {/* AUTHOR */}

               <Link

                  to={`/author/${blog.author?.name}`}

                  className="flex items-center gap-3"

               >

                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm">

                     {

                        blog.author?.name
                        ?.charAt(0)
                        ?.toUpperCase()

                        ||

                        "A"

                     }

                  </div>

                  <div>

                     <p className="text-sm font-semibold text-gray-900">

                        {

                           blog.author?.name

                           ||

                           "Admin"

                        }

                     </p>

                     <p className="text-xs text-gray-500">

                        {

                           new Date(

                              blog.createdAt

                           ).toDateString()

                        }

                     </p>

                  </div>

               </Link>

               {/* BUTTON */}

               <Link

                  to={`/blog/${blog.slug}`}

                  className="bg-black text-white px-5 py-3 rounded-2xl text-sm font-semibold hover:bg-indigo-600 transition"

               >

                  Read More

               </Link>

            </div>

         </div>

      </div>

   );

}

export default BlogCard;