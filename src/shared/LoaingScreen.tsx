
import logo from "../assets/logo-removebg-preview.png";
const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#1c3144]">
      <div className="relative flex items-center justify-center">
        {/* Spinner ring */}
        <div className="w-40 h-40 border-4 border-[#C8A978]/30 border-t-[#C8A978] rounded-full animate-spin"></div>

        {/* Logo in the center */}
        <img
          src={logo} 
          alt="Logo"
          className="absolute w-28 h-24"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
