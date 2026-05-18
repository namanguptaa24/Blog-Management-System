function Pagination({

   currentPage,

   totalPages,

   setCurrentPage

}){

   return(

      <div
         className="flex justify-center items-center gap-4 mt-14"
      >

         <button

            disabled={currentPage===1}

            onClick={()=>

               setCurrentPage(
                  currentPage-1
               )

            }

            className="bg-black text-white px-5 py-2 rounded-lg disabled:bg-gray-400"

         >

            Previous

         </button>

         <span
            className="font-bold text-lg"
         >

            Page {currentPage}
            of {totalPages}

         </span>

         <button

            disabled={currentPage===totalPages}

            onClick={()=>

               setCurrentPage(
                  currentPage+1
               )

            }

            className="bg-black text-white px-5 py-2 rounded-lg disabled:bg-gray-400"

         >

            Next

         </button>

      </div>

   );

}

export default Pagination;