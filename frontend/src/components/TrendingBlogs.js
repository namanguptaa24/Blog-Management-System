import {

   Link

} from "react-router-dom";

function TrendingBlogs({ blogs }){

   return(

      <div className="bg-white rounded-[35px] shadow-lg p-8">

         <h2 className="text-3xl font-bold mb-8">

            Trending Blogs

         </h2>

         <div className="space-y-6">

            {

               blogs.slice(0,5).map((blog,index)=>(

                  <Link

                     key={blog._id}

                     to={`/blog/${blog.slug}`}

                     className="flex gap-5 group"

                  >

                     {/* NUMBER */}

                     <div className="text-4xl font-bold text-gray-300 group-hover:text-indigo-600 transition">

                        0{index+1}

                     </div>

                     {/* CONTENT */}

                     <div>

                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition line-clamp-2">

                           {blog.title}

                        </h3>

                        <p className="text-sm text-gray-500 mt-2">

                           {

                              new Date(

                                 blog.createdAt

                              ).toDateString()

                           }

                        </p>

                     </div>

                  </Link>

               ))

            }

         </div>

      </div>

   );

}

export default TrendingBlogs;