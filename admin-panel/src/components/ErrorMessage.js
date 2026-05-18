function ErrorMessage({

   message

}){

   return(

      <div
         style={{

            background:"#ffebee",

            color:"#c62828",

            padding:"15px",

            margin:"20px 0",

            border:"1px solid #c62828",

            borderRadius:"5px"

         }}
      >

         {message}

      </div>

   );

}

export default ErrorMessage;