import React from "react";
import Calender from "./components/Calender";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <Calender />
      </div>
    </div>
  );
};

export default App;
