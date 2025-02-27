function LogMessage({ message }: { message: string }) {
  return (
    <div className={`flex justify-start`}>
      <div className="sm:max-w-3/4 max-w-11/12 my-4 bg-white rounded-xl px-4 py-2 shadow">
        <div className="text-black">{message}</div>
      </div>
    </div>
  );
}

export default LogMessage;
