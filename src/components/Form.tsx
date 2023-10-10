import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface ApiResponse {
   result: { [key: string]: string };
}

const Form = () => {
   const [inputValue, setInputValue] = useState("");
   const [responseData, setResponseData] = useState<ApiResponse | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [isVisible, setIsVisible] = useState(false);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   };

   const handleButtonClick = () => {
      fetchData(inputValue);
      setIsVisible(true);
   };

   const customErrorMessages: { [key: number]: string } = {
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
         const response: AxiosResponse<ApiResponse> =
            await axios.get<ApiResponse>(
               `https://api.shrtco.de/v2/shorten?url=${userInput}`
            );
         const data: ApiResponse = response.data;
         setResponseData(data);
         setError(null);
      } catch (error: any) {
         if (error.response.data.error_code in customErrorMessages) {
            setError(customErrorMessages[error.response.data.error_code]);
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div>
         <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-xl text-white font-semibold mb-4">
               Enter your link
            </h2>
            <div className="flex flex-wrap lg:flex-nowrap gap-4">
               <input
                  className="py-3 px-4 w-full lg:w-2/3 border rounded bg-gray-800 border-gray-800 text-white placeholder:text-gray-400 hover:border-cyan-500 hover:bg-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-gray-900 active:bg-gray-900 transition ease-in-out duration-500"
                  type="text"
                  placeholder="Enter your link here..."
                  value={inputValue}
                  onChange={handleInputChange}
               />
               <button
                  className="py-3 px-4 w-full lg:w-1/3 rounded bg-gradient-to-r from-cyan-500 to-cyan-300   text-gray-950 font-semibold hover:bg-gradient-to-r hover:from-cyan-300 hover:to-cyan-500"
                  onClick={handleButtonClick}
               >
                  Shorten URL
               </button>
            </div>
         </div>

         {isVisible && (
            <div className="bg-gray-900 rounded-lg p-8 mt-4">
               {isLoading ? (
                  <p className="font-normal text-green-400">Loading...</p>
               ) : error ? (
                  <div>
                     <p className="text-red-400">There is an error:</p>
                     <p className="font-normal text-white">{error}</p>
                  </div>
               ) : responseData ? (
                  <div>
                     <p className="font-normal text-cyan-400">
                        The short code is:
                     </p>
                     <p className="font-normal text-white">
                        {responseData.result.short_link}
                     </p>
                  </div>
               ) : null}
            </div>
         )}
      </div>
   );
};

export default Form;

// TODO:
// Add CSS.
// Create separate components for 'Displaying' and Errors?
// Add more validation to make sure the user enters a valid URL
