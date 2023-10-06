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

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   };

   const handleButtonClick = () => {
      fetchData(inputValue);
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

// TODO:
// Add CSS. Deploy.
// Add more validation to make sure the user enters a valid URL
