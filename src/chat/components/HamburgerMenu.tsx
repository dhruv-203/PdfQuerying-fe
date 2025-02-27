import { GrClose } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}
const HamburgerButton = ({ isOpen, onToggle }: HamburgerButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="absolute md:hidden flex z-[100] top-5 left-5 p-2 rounded-lg bg-[#09090b] text-white hover:bg-[#13131a] "
    >
      {isOpen ? (
        <GrClose size={24} className="text-white" />
      ) : (
        <IoMenu size={24} className="text-white" />
      )}
    </button>
  );
};

export default HamburgerButton;
