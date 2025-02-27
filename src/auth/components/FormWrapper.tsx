import React from "react";

function FormWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${
        className ?? ""
      } mx-auto max-w-[600px] shadow-md shadow-stone-500 p-4 border-1 border-stone-400 rounded-md`}
    >
      {children}
    </div>
  );
}

export default FormWrapper;
