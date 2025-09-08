import React, { useState, useEffect } from 'react';
import Joyride, { type Step, type CallBackProps, STATUS, ACTIONS } from 'react-joyride';
import { useDispatch, useSelector } from 'react-redux';

import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import type { RootState } from '../../redux/store/store';
import type { TourProps } from '../../types/tour';


const Tour: React.FC<TourProps> = ({ isOpen, onClose }) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // Check if user has completed the tour before
  useEffect(() => {
  if (isOpen) {
    const timer = setTimeout(() => setRun(true), 800); // 800ms delay for elements to mount
    return () => clearTimeout(timer);
  }
}, [isOpen]);

  useEffect(() => {
  // Check if user is new (first time logging in)
  const isNewUser = localStorage.getItem('user-visit-count') === null;
  
  if (isNewUser) {
    // Set visit count
    localStorage.setItem('user-visit-count', '1');
    
    // Start tour after a short delay to allow page to load
    const timer = setTimeout(() => {
      setRun(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  } else {
    // Increment visit count
    const visitCount = parseInt(localStorage.getItem('user-visit-count') || '0');
    localStorage.setItem('user-visit-count', (visitCount + 1).toString());
  }
}, []);

 

const steps: Step[] = [
  {
    target: "#dashboard", // Dashboard menu item
    title: "Dashboard",
    content: "This is your Dashboard. Here you can see an overview of all key metrics and stats.",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "#about", // About menu item
    title: "About Section",
    content: "This section gives you information about the company, app, or services.",
    placement: "right",
  },
  
  
  {
    target: "#features", // Features menu item
    title: "Features Section",
    content: "Here you can explore all the main features offered by the app.",
    placement: "right",
  },
  {
    target: "#contact", // Contact menu item
    title: "Contact Section",
    content: "Reach out to us or find our contact information in this section.",
    placement: "right",
  },
  {
    target: "#faq", // FAQ menu item
    title: "FAQ Section",
    content: "Check frequently asked questions and find answers quickly.",
    placement: "right",
  },
  {
    target: "#logout", // Logout button
    title: "Logout",
    content: "Click here to securely log out of your account.",
    placement: "left",
  },
];



  

 const handleJoyrideCallback = (data: CallBackProps) => {
  const { status, action, index, type } = data;

  if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
    // Stop the tour completely
    setRun(false);
    setStepIndex(0);
    localStorage.setItem('tour-completed', 'true');
    onClose(); // close tour panel
    return;
  }

  // Update stepIndex for Next / Back buttons
  if (type === 'step:after' || type === 'target:notFound') {
    setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
  }
};





  const restartTour = () => {
    setStepIndex(0);
    setRun(true);
    localStorage.removeItem('tour-completed');
  };

  const skipTour = () => {
    setRun(false);
    setStepIndex(0);
    onClose();
    localStorage.setItem('tour-completed', 'true');
  };

  if (!isOpen) return null;

  return (
    <>
      <Joyride
  steps={steps}
  run={run}
  stepIndex={stepIndex}
  continuous={true}
  scrollToFirstStep={true}
  showProgress={true}
  showSkipButton={true}
  callback={handleJoyrideCallback}
  styles={{}}
  locale={{ back: 'Back', close: 'Close', last: 'Finish', next: 'Next', skip: 'Skip' }}
  scrollOffset={50} // optional, scrolls a bit higher so tooltip is visible
  disableScrolling={false}
  scrollToSteps={true}
/>



      

      {/* Tour Control Panel */}
      <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 border border-gold-500/30 w-80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-blue-900">Guided Tour</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Take a guided tour to learn about the key features of your dashboard.
        </p>
        
        <div className="flex space-x-2">
          <button
            onClick={restartTour}
            className="flex-1 bg-gold-500 text-blue-900 py-2 px-4 rounded-md text-sm font-medium hover:bg-gold-400 flex items-center justify-center"
          >
            <ArrowPathIcon className="h-4 w-4 mr-1" />
            Restart Tour
          </button>
          <button
            onClick={skipTour}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-300"
          >
            Skip
          </button>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gold-500 h-2 rounded-full" 
              style={{ width: `${(stepIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 ml-2">
            {stepIndex + 1} / {steps.length}
          </span>
        </div>
      </div>
    </>
  );
};

export default Tour;