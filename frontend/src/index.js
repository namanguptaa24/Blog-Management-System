import React from "react";

import ReactDOM from "react-dom/client";

import {
   HelmetProvider
} from "react-helmet-async";

import {
   ThemeProvider
} from "./context/ThemeContext";

import App from "./App";

import "./index.css";

const root =
ReactDOM.createRoot(

   document.getElementById("root")

);

root.render(

   <React.StrictMode>

      <HelmetProvider>

         <App />

      </HelmetProvider>

   </React.StrictMode>

);

root.render(
<React.StrictMode>

   <ThemeProvider>

      <App />

   </ThemeProvider>

</React.StrictMode>
);