import { Link } from "react-router-dom";

function Dashboard(){

   const user = JSON.parse(
      localStorage.getItem("user")
   );

   const handleLogout = () => {

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.replace("/");

   };

   return(

      <div>

         <div
            style={{
               display:"flex",
               justifyContent:"space-between",
               alignItems:"center"
            }}
         >

            <h1>Dashboard</h1>

            <h2>
               {user?.name}
               {" | "}
               {user?.role}
            </h2>

         </div>

         <br />

         {
            user?.role !== "VIEWER" && (

               <>

                  <Link to="/create-blog">
                     Create Blog
                  </Link>

                  <br /><br />

               </>

            )
         }

         <Link to="/blogs">
            View Blogs
         </Link>

         <br /><br />

         {
            user?.role !== "VIEWER" && (

               <>

                  <Link to="/drafts">
                     Draft Blogs
                  </Link>

                  <br /><br />

               </>

            )
         }

         {
            user?.role === "SUPER_ADMIN" && (

               <>

                  <Link to="/users">
                     Manage Users
                  </Link>

                  <br /><br />

               </>

            )
         }

         <button onClick={handleLogout}>
            Logout
         </button>

      </div>

   );

}

export default Dashboard;