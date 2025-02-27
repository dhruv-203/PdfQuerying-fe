import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setSelectedConversationId } from "../../store/chat.slice";

function ConversationCapsule({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  const selectedConversation = useSelector<RootState, string | null>(
    (state) => state.chat.selectedConversationId
  );
  const dispatch = useDispatch();
  // if (title === selectedConversation) {
  //   console.log(selectedConversation);
  // }
  // console.log("con: ", selectedConversation);
  // console.log("title: ", title);
  return (
    <div
      onClick={() => dispatch(setSelectedConversationId(title))}
      className={`${className} ${
        selectedConversation === title
          ? "bg-gray-600 border-[#09090b]"
          : "bg-[#09090b] border-[#27272a]"
      } flex border  flex-col gap-2 p-4 text-sm text-[#f8fafc] rounded-sm  w-full`}
    >
      {title}
    </div>
  );
}

export default ConversationCapsule;
