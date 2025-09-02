import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { useGetProfileQuery } from "./redux/features/auth/auth.api";
import LoadingScreen from "./shared/LoaingScreen";


function App() {
   const {  isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
}

export default App;