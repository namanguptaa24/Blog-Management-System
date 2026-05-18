import {
   BrowserRouter,
   Routes,
   Route
} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import CreateBlog from "./pages/CreateBlog";

import Blogs from "./pages/Blogs";

import Drafts from "./pages/Drafts";

import Users from "./pages/Users";

import BlogDetails from "./pages/BlogDetails";

import EditBlog from "./pages/EditBlog";

import PreviewBlog from "./pages/PreviewBlog";

import ProtectedRoute from "./components/ProtectedRoute";

import TagBlogs from "./pages/TagBlogs";

import CategoryBlogs from "./pages/CategoryBlogs";

function App(){

   return(

      <BrowserRouter>

         <Routes>

            <Route
               path="/"
               element={<Login />}
            />

            <Route
               path="/register"
               element={<Register />}
            />

            <Route
               path="/dashboard"
               element={

                  <ProtectedRoute>

                     <Dashboard />

                  </ProtectedRoute>

               }
            />

            <Route
               path="/create-blog"
               element={

                  <ProtectedRoute>

                     <CreateBlog />

                  </ProtectedRoute>

               }
            />

            <Route
               path="/blogs"
               element={

                  <ProtectedRoute>

                     <Blogs />

                  </ProtectedRoute>

               }
            />

            <Route
               path="/blogs/:slug"
               element={

                  <ProtectedRoute>

                     <BlogDetails />

                  </ProtectedRoute>

               }
            />

            <Route
               path="/drafts"
               element={

                  <ProtectedRoute>

                     <Drafts />

                  </ProtectedRoute>

               }
            />

            <Route
               path="/users"
               element={

                  <ProtectedRoute>

                     <Users />

                  </ProtectedRoute>

               }
            />

            <Route
               path="/edit-blog/:id"
               element={

                  <ProtectedRoute>

                     <EditBlog />

                  </ProtectedRoute>

               }
            />

            <Route
               path="/preview-blog"
               element={

                  <ProtectedRoute>

                     <PreviewBlog />

                  </ProtectedRoute>

               }
            />

            <Route
               path="/tag-blogs/:tag"
               element={

                  <ProtectedRoute>

                     <TagBlogs />

                  </ProtectedRoute>

               }
            />
            <Route
               path="/category-blogs/:category"
               element={

                  <ProtectedRoute>

                     <CategoryBlogs />

                  </ProtectedRoute>

               }
            />
         </Routes>

      </BrowserRouter>

   );

}

export default App;