import React, { useState } from "react";
import axios from "axios";

const Form = () => {
   const [inputValue, setInputValue] = useState("");
   const [responseData, setResponseData] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   };

   const handleButtonClick = () => {
      fetchData(inputValue);
   };

   const customErrorMessages = {
      1: "No URL specified. Please enter a URL to shorten.",
      2: "Invalid URL submitted. Please enter a valid URL.",
      3: "Rate limit reached. Wait a second and try again",
      4: "IP-Address has been blocked because of violating our terms of service",
      5: "shrtcode code (slug) already taken/in use",
      10: "Trying to shorten a disallowed Link. More information on disallowed links",
   };

   const fetchData = async (userInput: string) => {
      setIsLoading(true);

      try {
         const response = await axios.get(
            `https://api.shrtco.de/v2/shorten?url=${userInput}`
         );
         const data = response.data;
         setResponseData(data);
         setError(null);
      } catch (error) {
         if (error.response.data.error_code in customErrorMessages) {
            setError(customErrorMessages[error.response.data.error_code]);
         }
         console.log(error.response);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div>
         <h2 className="text-xl font-semibold mb-4">URL Shortener</h2>
         <input
            className="py-3 px-4 border border-orange-400"
            type="text"
            placeholder="Enter your link here..."
            value={inputValue}
            onChange={handleInputChange}
         />
         <button
            className="py-3 px-4 ml-4 bg-orange-500 border border-orange-400 text-white font-semibold"
            onClick={handleButtonClick}
         >
            Shorten URL
         </button>

         <div>
            {isLoading ? (
               <p>Loading...</p>
            ) : error ? (
               <div>
                  There is an error:
                  <p className="font-bold">{error}</p>
               </div>
            ) : responseData ? (
               <div>
                  The short code is:
                  <p className="font-bold">{responseData.result.short_link}</p>
               </div>
            ) : null}
         </div>
      </div>
   );
};

export default Form;

// Manages the input field for the long URL.
// Contains the "Generate Short URL" button.
// Handles user input and initiates the URL shortening process.
