import React from 'react';

import { PlayIcon } from '@heroicons/react/24/outline';
import { useTour } from '../components/tour/TourContext';

const Settings: React.FC = () => {
  const { openTour } = useTour();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Guided Tour</h2>
        <p className="text-gray-600 mb-4">
          Take a guided tour to learn about all the features of your dashboard.
        </p>
        <button
          onClick={openTour}
          className="bg-gold-500 text-blue-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gold-400 flex items-center"
        >
          <PlayIcon className="h-4 w-4 mr-2" />
          Start Guided Tour
        </button>
      </div>
    </div>
  );
};

export default Settings;