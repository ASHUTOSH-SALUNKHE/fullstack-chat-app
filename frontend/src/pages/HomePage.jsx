import { useChatStore } from "../store/useChatStore";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // Detect screen size for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Mobile View Logic */}
            {isMobileView ? (
              !selectedUser ? (
                <Sidebar />
              ) : (
                <ChatContainer />
              )
            ) : (
              // Desktop View Logic
              <>
                <Sidebar />
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;