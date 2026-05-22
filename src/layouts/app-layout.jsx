import Header from "@/components/header";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 bg-gray-800 mt-10 flex justify-center items-center gap-2 text-gray-200">
        <span>Made with</span>
        <img 
          src="/sparkling-heart_1f496.gif" 
          alt="heart" 
          className="w-6 h-6 object-contain"
        />
        <span>by</span>
        <a href="https://github.com/dinesh-mehta7" className="text-orange-400 hover:text-blue-600 transition-colors">
          Dinesh Mehta
        </a>
      </div>
      
    </div>
  );
};

export default AppLayout;