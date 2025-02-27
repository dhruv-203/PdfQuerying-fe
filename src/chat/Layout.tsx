// import { RootState } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../components/MainLayout";
import { useSocketContext } from "../SocketProvider";
import { RootState } from "../store";
import ChatWindow from "./components/ChatWindow";
import DocumentUpload from "./components/DocumentUpload";
import HamburgerButton from "./components/HamburgerMenu";
import LogMessageScreen from "./components/LogMessageScreen";
import SideBar from "./components/SideBar";
function ChatLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);
  const [logMessage, setLogMessage] = useState<string>("");
  const selectedConversation = useSelector<RootState, string | null>(
    (state) => state.chat.selectedConversationId
  );
  const { socket } = useSocketContext();
  useEffect(() => {
    if (socket) {
      socket.on("pdfUploadLogs", (data: string) => {
        console.log(data);
        setLogMessage(data);
      });
    }
  }, [socket]);
  return (
    <MainLayout>
      <div className="h-full w-full flex items-center justify-center text-lg text-white relative overflow-hidden">
        <HamburgerButton isOpen={isOpen} onToggle={onToggle} />
        <div
          className={`" h-full md:relative inset-y-0 left-0 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out z-60 md:z-auto w-5/6 sm:w-1/2 lg:w-1/4 md:w-1/3 md:block ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <SideBar setLogMessage={setLogMessage} />
        </div>
        <div className="flex-1 h-full flex flex-col justify-center items-center inset-y-0 overflow-hidden p-5">
          {selectedConversation ? (
            <ChatWindow
              className=""
              selectedConversation={selectedConversation}
            />
          ) : logMessage.length > 0 ? (
            <LogMessageScreen className="" message={logMessage} />
          ) : (
            <DocumentUpload className="" setLogMessage={setLogMessage} />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default ChatLayout;
