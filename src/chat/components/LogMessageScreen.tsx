function LogMessageScreen({
  className,
  message,
}: {
  className: string;
  message: string;
}) {
  return (
    <div
      className={`${className} flex flex-col w-5/6 gap-2 p-10 text-[#f8fafc] rounded-lg bg-[#13131a] `}
    >
      <div className="text-3xl gap-2 p-4 font-bold">
        Please wait while we analyze your document
      </div>
      <div className="text-xl gap-2 p-4 pl-15 font-bold ">{message}</div>
    </div>
  );
}

export default LogMessageScreen;
