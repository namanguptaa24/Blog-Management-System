import {

   BrowserRouter,
   Routes,
   Route

} from "react-router-dom";

import Home from "./pages/Home";

import BlogDetails from "./pages/BlogDetails";

import CategoryPage from "./pages/CategoryPage";
import TagPage from "./pages/TagPage";
import AuthorPage from "./pages/AuthorPage";
import SearchPage from "./pages/SearchPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
function App(){

   return(

      <BrowserRouter>

         <Routes>

            <Route

               path="/"

               element={<Home />}

            />

            <Route

               path="/blog/:slug"

               element={<BlogDetails />}

            />

            <Route

               path="/category/:name"

               element={<CategoryPage />}

            />

            <Route

               path="/tag/:tag"

               element={<TagPage />}

            />

            <Route

               path="/author/:author"

               element={<AuthorPage />}

            />
            <Route

               path="/search"

               element={<SearchPage />}

            />

            <Route

               path="/about"

               element={<About />}

            />

            <Route

               path="/contact"

               element={<Contact />}

            />

         </Routes>

      </BrowserRouter>

   );

}

export default App;