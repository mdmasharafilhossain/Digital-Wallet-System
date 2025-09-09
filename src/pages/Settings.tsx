import React from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useTour } from "../components/tour/TourContext";
import { Link } from "react-router";

const Settings: React.FC = () => {
  const { openTour } = useTour();

  return (
    <div className="space-y-8 p-6">
      {/* Page Header */}
      <div className="bg-[#355676] shadow-lg rounded-2xl p-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#E6D5B8]">⚙️ Settings</h1>
       
      </div>

      {/* Guided Tour Section */}
      <div className="bg-[#355676]  shadow-lg rounded-2xl p-8 transition duration-300 hover:shadow-2xl">
        <h2 className="text-xl font-semibold text-[#E6D5B8] mb-4">
          🚀 Guided Tour
        </h2>
        <p className="text-[#E6D5B8] mb-6 leading-relaxed">
          Take a guided tour to explore all the key features of your dashboard
          and get the most out of the platform.
        </p>

        <Link to='/'> 
        <button
          onClick={openTour}
          className="flex items-center gap-2 bg-[#355676] text-[#E6D5B8] px-6 py-3 rounded-xl font-medium 
                     hover:text-[#C8A978] hover:scale-105 transition transform duration-200 shadow-md"
        >
          <PlayIcon className="h-5 w-5" />
          Start Guided Tour
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
