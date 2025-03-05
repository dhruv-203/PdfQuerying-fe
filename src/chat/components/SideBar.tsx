// import { RootState } from "@reduxjs/toolkit/query";
import { RiChatNewLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useSocketContext } from "../../SocketProvider";
import { RootState } from "../../store";
import { useLogoutMutation } from "../../store/auth.api";
import { useGetAllConversationsQuery } from "../../store/chat.api";
import { setSelectedConversationId } from "../../store/chat.slice";
import { APIError, APIResponse, User } from "../../store/types";
import CircleDiv from "./CircleDiv";
import ConversationCapsule from "./ConversationCapsule";
function SideBar({
  setLogMessage,
}: {
  setLogMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const user = useSelector<RootState, User | null>((state) => state.auth.user);
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const {
    data: conversations,
    isLoading: isLoadingConversations,
    isError,
    refetch,
  } = useGetAllConversationsQuery();
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  if (isError) {
    console.log(isError);
    toast.error(`Error Occurred ${(conversations as APIError).message}`);
    return (
      <div>Error Occurred ${JSON.stringify(conversations as APIError)}</div>
    );
  }

  if (socket) {
    socket.on("NewConvo", async () => {
      await refetch();
    });
  }

  const handleNewConversation = async () => {
    dispatch(setSelectedConversationId(null));
    setLogMessage("");
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("Logged out successfully");
    } catch (error: unknown) {
      console.log(error);
      if (error && typeof error === "object" && "data" in error) {
        toast.error(
          `Error Occurred: ${
            (error as { data: { message: string } }).data.message
          }`
        );
      } else {
        console.log(error);
        toast("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="flex flex-col h-full w-full bg-[#13131a]">
      <div className="h-20 rounded-sm relative mb-2 flex items-center justify-center font-bold shadow-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">
        <div className="p-2">Conversations</div>
        <RiChatNewLine
          className="h-6 w-6 cursor-pointer absolute self-center text-[#f8fafc] right-6 bottom-7 "
          // onClick={handleLogout}
          onClick={handleNewConversation}
        />
      </div>
      <div className="flex-1 p-2 overflow-y-scroll no-scrollbar">
        {isLoadingConversations ? (
          <div className="w-full h-full flex items-center justify-center text-lg text-white relative overflow-hidden">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <>
            {(conversations as APIResponse<{ conversations: string[] }>).data
              .conversations.length === 0 ? (
              <div className="flex-1 flex items-center text-2xl font-semibold justify-center w-full text-center text-white">
                No Conversations
              </div>
            ) : (
              (
                conversations as APIResponse<{ conversations: string[] }>
              ).data.conversations.map((conversation: string) => {
                // console.log("con: ", conversation);
                return (
                  <ConversationCapsule
                    key={conversation}
                    title={conversation}
                    className={`mb-2 hover:cursor-pointer`}
                  />
                );
              })
            )}
          </>
        )}
      </div>
      <div className="h-20 rounded-sm px-4 py-2 mt-2 flex items-center justify-center font-bold shadow-lg bg-gradient-to-r from-[#10b981] to-[#06b6d4]">
        <div className="flex justify-start gap-4 flex-1 align-center">
          <CircleDiv
            className=""
            height="h-12"
            width="w-12"
            imgSrc={user?.profilePicture}
          />
          <div
            className={`text-lg flex line-clamp-1 shrink-1 items-center justify-center gap-3 font-semibold text-white p-2`}
          >
            {user?.name}
          </div>
        </div>
        {isLogoutLoading ? (
          <Spinner className="h-8 w-8" />
        ) : (
          <TbLogout2
            className="h-8 w-8 cursor-pointer self-center text-[#f8fafc]"
            onClick={handleLogout}
          />
        )}
      </div>
    </div>
  );
}

export default SideBar;
