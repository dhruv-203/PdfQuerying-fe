import { toast } from "react-toastify";
import { useCreateConversationMutation } from "../../store/chat.api";
function DocumentUpload({
  className,
  setLogMessage,
}: {
  className: string;
  setLogMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [createConversation, { isLoading: isFileUploading }] =
    useCreateConversationMutation();
  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && !file.type.includes("pdf")) {
      toast.error("Only pdf files are allowed");
      // cleared the file input
      event.target.value = "";
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("pdfFile") as File;
    console.log(Array.from(formData.keys()));

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    console.log(file.type);
    try {
      await createConversation(formData).unwrap();
    } catch (error: unknown) {
      if (error && typeof error === "object" && "data" in error) {
        toast.error(
          `Error Occurred: ${
            (error as { data: { message: string } }).data.message
          }`
        );
      } else {
        console.log(error);
        toast.error("An unexpected error occurred");
      }
      setLogMessage("");
    }
  };

  return (
    <div
      className={`${className} flex flex-col w-5/6 gap-2 p-4 text-[#f8fafc] rounded-lg bg-[#13131a] `}
    >
      <div className="flex flex-col gap-2 p-4 ">
        <div className="text-3xl gap-2 flex flex-col font-bold">
          <div>Upload the Pdf file</div>
          <div className="text-lg font-medium">
            Note: the file must be in pdf format and it should contain
            selectable text
          </div>
        </div>
        <form
          onSubmit={handleUpload}
          className="flex flex-col sm:flex-row  gap-4 p-2 text-lg"
          encType="multipart/form-data"
        >
          <input
            type="file"
            accept="application/pdf"
            name="pdfFile"
            onChange={handleFileSelection}
            className="px-4 py-2 sm:w-3/5 w-full self-start rounded-md border border-[#27272a] text-white"
          />
          <button
            disabled={isFileUploading}
            className="px-4 py-2 rounded-md sm:w-2/5 w-3/5 sm:text-lg text-base text-center self-center font-bold shadow-lg bg-gradient-to-r from-[#10b981] to-[#06b6d4]"
          >
            {isFileUploading ? "Loading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DocumentUpload;
