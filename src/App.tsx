import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import ChatLayout from "./chat/Layout";
import SocketProvider from "./SocketProvider";
import { RootState } from "./store";
import { User } from "./store/types";

function App() {
  const user = useSelector<RootState, User | null>((state) => state.auth.user);
  useEffect(() => {}, [user]);

  return (
    <SocketProvider>
      <ChatLayout />
    </SocketProvider>
  );
}

export default App;
