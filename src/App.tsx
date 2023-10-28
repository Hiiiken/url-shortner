// import React from "react";
import Form from './components/Form';

const App = () => {
   return (
      <div className="bg-gradient-to-r from-gray-950 to-gray-900 h-screen flex justify-center content-center flex-wrap p-10 sm:p-20">
         <div className="w-[720px] lg:[720px] p-8 border rounded-lg border-cyan-700">
            <h1 className="text-4xl mb-4 text-white font-black ">
               URL SHORTENER
            </h1>
            <p className="text-white mb-8 text-base">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
               quod! Similique adipisci sit excepturi illo dolor voluptatibus
               officiis placeat quibusdam.
            </p>
            <Form />
         </div>
      </div>
   );
};

export default App;
