import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageType } from "../../store/types";

export interface MessageProps {
  message: MessageType;
}

function Message({ message }: MessageProps) {
  return (
    <div
      key={message.id}
      className={`flex ${
        message.type === "USER" ? "justify-end" : "justify-start"
      }`}
    >
      <div className="sm:max-w-3/4 max-w-11/12 my-4 bg-white rounded-xl px-4 py-2 shadow">
        <div className="text-black space-y-2 break-words text-pretty">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Code Blocks
              pre: ({ children }) => (
                <pre className="overflow-x-auto break-words whitespace-pre-wrap bg-[#09090b] text-white p-3 rounded-md border border-[#27272a]">
                  {children}
                </pre>
              ),
              code: ({ children }) => (
                <code className=" px-1 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              ),

              // Lists
              ul: ({ children }) => (
                <ul className="list-disc pl-5 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 space-y-1">{children}</ol>
              ),
              li: ({ children }) => <li className="text-black">{children}</li>,

              // Blockquotes
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-3 italic text-gray-600">
                  {children}
                </blockquote>
              ),

              // Tables
              table: ({ children }) => (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-200">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-300 px-4 py-2">{children}</td>
              ),
              tr: ({ children }) => (
                <tr className="even:bg-gray-100">{children}</tr>
              ),
            }}
          >
            {message.message}
          </Markdown>
        </div>
        <div className="text-right text-xs text-gray-400 mt-1">
          {new Date(message.createdAt).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}

export default Message;
