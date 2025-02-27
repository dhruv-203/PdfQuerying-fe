import { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useSocketContext } from "../../SocketProvider";
import {
  useLazyGetConversationByIdQuery,
  useSendMessageMutation,
} from "../../store/chat.api";
import { MessageType } from "../../store/types";
import Message from "./Message";
function ChatWindow({
  className,
  selectedConversation,
}: {
  className: string;
  selectedConversation: string;
}) {
  //input div ref
  const divRef = useRef<HTMLDivElement>(null);
  //input content
  const [content, setContent] = useState("");
  //chat messages state
  const [messages, setMessages] = useState<MessageType[]>([]);
  //socket connection
  const { socket } = useSocketContext();
  //is active collection exists to control the appearance of the chat input
  const [isActiveCollectionExists, setIsActiveCollectionExists] =
    useState<boolean>(false);

  //chat display ref to control the scroll to bottom
  const chatDisplayRef = useRef<HTMLDivElement>(null);
  //send message mutation
  const [sendMessage, { isLoading: isSendingMessage }] =
    useSendMessageMutation();
  //get conversation by id query to get the conversation messages as the selected conversation changes
  const [getConversationById, { data, isLoading: isConversationLoading }] =
    useLazyGetConversationByIdQuery();
  // scrolls bottom of chat display, when new message is added
  const scrollToBottom = () => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  };

  //handle input change (manual capture)
  const handleInput = () => {
    if (divRef.current) {
      setContent(divRef.current.innerText);
    }
  };

  //handle key down event to detect enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      executeSendMessage();
    }
  };

  // common action to send the message from on submit event when the submit button is clicked or enter key is pressed
  const executeSendMessage = () => {
    if (!content || content.trim() === "") {
      toast.error("Please enter a message");
      return;
    }
    sendMessage({ conversationId: selectedConversation, message: content })
      .unwrap()
      .then((data) => {
        console.log(data);
      });

    setContent("");
    divRef.current!.innerHTML = "";
  };

  // handle submit event to execute the send message function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeSendMessage();
  };

  //handle server message to add the message to the chat messages state, used in the socket on userMessage event
  const handleServerMessage = (data: MessageType) => {
    if (data) {
      setMessages((prevMessages) => [...prevMessages, data]);
    }
  };

  //handle chat logs to add the chat logs to the chat display, used in the socket on chatLogs event
  const handleChatLogs = (data: { message: string; done: boolean }) => {
    if (data && divRef.current) {
      // setLogs((logs) => `${logs},${data.message}`);
      divRef.current!.innerHTML += `${data.message}</br>`;
      if (data.done) {
        divRef.current!.innerHTML = "";
      }
    }
  };

  //scroll to bottom of chat display when the messages state changes
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  //add event listeners to the socket to handle the userMessage and chatLogs events
  useEffect(() => {
    if (socket) {
      socket.on("userMessage", handleServerMessage);

      socket.on("chatLogs", handleChatLogs);
    }
    return () => {
      if (socket) {
        socket.off("userMessage", handleServerMessage);
        socket.off("chatLogs", handleChatLogs);
      }
    };
  }, [socket]);

  //get the conversation messages when the selected conversation changes
  useEffect(() => {
    if (selectedConversation) {
      try {
        getConversationById(selectedConversation)
          .unwrap()
          .then((data) => {
            console.log(data.data.conversation);
            if (data) {
              setMessages([...data.data.conversation.messages]);
              setIsActiveCollectionExists(data.data.isActiveCollectionExists);
            }
          });
      } catch (error) {
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
    }
  }, [selectedConversation]);

  return (
    <div
      className={`${className} flex flex-col items-center h-full justify-center flex-1 w-full gap-2 p-4 text-[#f8fafc] rounded-lg bg-[#13131a]`}
    >
      {isConversationLoading || !data ? (
        <Spinner className="h-8 w-8" />
      ) : (
        <>
          <div
            ref={chatDisplayRef}
            className="chatScreen rounded-lg flex-1 flex flex-col overflow-scroll w-full no-scrollbar"
          >
            {messages.length > 0 ? (
              <>
                {messages.map((message) => {
                  return <Message key={message.id} message={message} />;
                })}
              </>
            ) : (
              <div className="flex-1 flex items-center text-2xl font-semibold justify-center w-full text-center text-white">
                No New Messages
              </div>
            )}
          </div>
          {isActiveCollectionExists && (
            <form
              onSubmit={handleSubmit}
              className="chatInput w-full h-1/6 flex flex-row gap-3 p-2 relative border-white rounded-lg border-1"
            >
              <div
                ref={divRef}
                contentEditable={!isSendingMessage}
                onInput={handleInput} // Fires when text is changed
                onKeyDown={handleKeyDown}
                className="p-2 min-h-[50px]  max-h-[100px] w-full max-w-screen overflow-y-scroll text-pretty md:text-balance inset-y-0 relative flex-1 flex no-scrollbar focus:border-0 focus:outline-0 gap-2 py-2  text-white"
              />
              <button
                type="submit"
                className="flex items-center justify-center h-12 w-12 gap-2  text-white font-bold shadow-lg text-center rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] self-center "
                disabled={isSendingMessage}
              >
                {isSendingMessage ? (
                  <Spinner className="h-8 w-8" />
                ) : (
                  <IoMdArrowRoundUp className="h-full w-full p-2 font-bold " />
                )}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default ChatWindow;
