const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const authRoutes =
require("./routes/authRoutes");

const blogRoutes =
require("./routes/blogRoutes");

const userRoutes =
require("./routes/userRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({

   extended:true

}));

mongoose.connect(

   process.env.MONGO_URI

)

.then(()=>{

   console.log(
      "MongoDB Connected"
   );

})

.catch((err)=>{

   console.log(err);

});

app.use(

   "/api/auth",

   authRoutes

);

app.use(

   "/api/blogs",

   blogRoutes

);

app.use(

   "/api/users",

   userRoutes

);

app.get("/",(req,res)=>{

   res.send(
      "API Running"
   );

});

app.use((err,req,res,next)=>{

   console.log(err);

   res.status(500).json({

      message:

      err.message ||

      "Server Error"

   });

});

const PORT =

process.env.PORT || 5000;

app.listen(PORT,()=>{

   console.log(

      `Server running on ${PORT}`

   );

});