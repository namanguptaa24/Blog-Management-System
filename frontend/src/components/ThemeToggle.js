import {
   useTheme
} from "../context/ThemeContext";

function ThemeToggle(){

   const {

      darkMode,
      toggleTheme

   } = useTheme();

   return(

      <button

         onClick={toggleTheme}

         className="bg-gray-200 dark:bg-gray-800 dark:text-white px-5 py-3 rounded-2xl font-semibold transition"

      >

         {

            darkMode

            ?

            "☀ Light"

            :

            "🌙 Dark"

         }

      </button>

   );

}

export default ThemeToggle;