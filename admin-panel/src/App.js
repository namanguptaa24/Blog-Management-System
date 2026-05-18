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

import Layout from "./components/Layout";

function App(){

   return(

      <BrowserRouter>

         <Routes>

            {/* Public Routes */}
            <Route
               path="/"
               element={<Login />}
         />

            <Route
               path="/login"
               element={<Login />}
            />

            <Route
               path="/register"
               element={<Register />}
            />

            {/* Protected Admin Routes */}

            <Route

               element={

                  <ProtectedRoute>

                     <Layout />

                  </ProtectedRoute>

               }

            >

               <Route
                  path="/dashboard"
                  element={<Dashboard />}
               />

               <Route
                  path="/create-blog"
                  element={<CreateBlog />}
               />

               <Route
                  path="/blogs"
                  element={<Blogs />}
               />

               <Route
                  path="/blogs/:slug"
                  element={<BlogDetails />}
               />

               <Route
                  path="/drafts"
                  element={<Drafts />}
               />

               <Route
                  path="/users"
                  element={<Users />}
               />

               <Route
                  path="/edit-blog/:id"
                  element={<EditBlog />}
               />

               <Route
                  path="/preview-blog"
                  element={<PreviewBlog />}
               />

               <Route
                  path="/tag-blogs/:tag"
                  element={<TagBlogs />}
               />

               <Route
                  path="/category-blogs/:category"
                  element={<CategoryBlogs />}
               />

            </Route>

         </Routes>

      </BrowserRouter>

   );

}

export default App;