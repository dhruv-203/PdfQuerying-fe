import { ToastContainer } from "react-toastify";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen min-h-screen min-w-[300px] overflow-hidden bg-[#09090b]">
      <ToastContainer position="top-right" />
      {children}
    </div>
  );
}

export default MainLayout;
