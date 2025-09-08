/* eslint-disable react-hooks/rules-of-hooks */
import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { useGetProfileQuery } from "./redux/features/auth/auth.api";
import LoadingScreen from "./shared/LoaingScreen";
import { useTour } from "./components/tour/TourContext";
import type { RootState } from "./redux/store/store";
import { useSelector } from "react-redux";
import Tour from "./components/tour/Tour";
import { useEffect } from "react";


function App() {
   const {  isLoading } = useGetProfileQuery();
   const { isAuthenticated } = useSelector((state: RootState) => state.auth);
const { isTourOpen, closeTour ,openTour } = useTour();
useEffect(() => {
    if (isAuthenticated) {
      const alreadyCompleted = localStorage.getItem("tour-completed");
      if (!alreadyCompleted) {
        openTour(); // 🔥 auto-open tour for new users
      }
    }
  }, [isAuthenticated, openTour]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <CommonLayout>
      {isAuthenticated && (
        <Tour isOpen={isTourOpen} onClose={closeTour} />
      )}
      <Outlet />
    </CommonLayout>
  );
}

export default App;