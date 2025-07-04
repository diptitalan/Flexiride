import React, { useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";

interface DocumentUploadProps {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  file,
  setFile,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [file, setFile] = useState<File | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  //file size shouldnt be greater than 1MB
  const handleFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, or PDF files are allowed.");
      return;
    }

    if (file.size > 1048576) {
      alert("File size should be less than or equal to 1MB.");
      return;
    }
    setFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleClear = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    setShowConfirm(false);
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-[#666666] mb-1">
        {label}
      </label>

      {!file ? (
        <div
          className="w-full md:w-1/2 p-6 border border-gray-300 rounded-md text-center cursor-pointer"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-5 w-5 text-gray-600" />
            <p className="text-sm">Click to upload or drag and drop</p>
          </div>
          <input
            type="file"
            accept="image/*,.pdf"
            ref={inputRef}
            onChange={handleChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="w-full p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5" />
            <div className="flex flex-col justify-center">
              <p className="text-sm">{file.name}</p>
              <p className="text-xs text-[#666666]">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="self-start mt-1"
          >
            <X className="w-4 h-4 hover:cursor-pointer" strokeWidth={3} />
          </button>
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 bg-[#0000006d] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FFFBF3] rounded-lg p-4 w-80 shadow-lg">
            <h2 className="text-2xl font-medium mb-2">Delete Document?</h2>
            <p className="text-sm text-[#666666] mb-4">
              You are about to delete document.
              <br />
              Are you sure you want to proceed?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleClear}
                className="hover:cursor-pointer px-12 py-2 border border-black rounded-3xl"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-[#CC1D1D] hover:cursor-pointer text-white px-12 py-2 rounded-3xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;

// import React, { useRef, useState } from "react";
// import { Upload, X, FileText } from "lucide-react";

// interface DocumentUploadProps {
//   label: string;
//   file: File | null;
//   setFile: (file: File | null) => void;
// }

// const DocumentUpload: React.FC<DocumentUploadProps> = ({ label,file,setFile }) => {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   // const [file, setFile] = useState<File | null>(null);
//   const [showConfirm, setShowConfirm] = useState(false);

//   //file size shouldnt be greater than 1MB
//   const handleFile = (file: File) => {
//     if (file.size > 1048576) {
//       alert("File size should be less than or equal to 1MB.");
//       return;
//     }
//     // setFile(file);
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       // Upload to serverless API
//       const res = await fetch("https://your-api-url.com/upload", {
//         method: "PUT",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Upload failed");

//       setFile(file);
//     } catch (err) {
//       alert("Failed to upload file.");
//       console.error(err);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) handleFile(selectedFile);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile) handleFile(droppedFile);
//   };

//   const handleClear = () => {
//     setFile(null);
//     if (inputRef.current) inputRef.current.value = "";
//     setShowConfirm(false);
//   };

//   return (
//     <div className="mb-4">
//       <label className="block text-xs font-medium text-[#666666] mb-1">
//         {label}
//       </label>

//       {!file ? (
//         <div
//           className="w-full md:w-1/2 p-6 border border-gray-300 rounded-md text-center cursor-pointer"
//           onClick={() => inputRef.current?.click()}
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={handleDrop}
//         >
//           <div className="flex flex-col items-center space-y-2">
//             <Upload className="h-5 w-5 text-gray-600" />
//             <p className="text-sm">Click to upload or drag and drop</p>
//           </div>
//           <input
//             type="file"
//             accept="image/*,.pdf"
//             ref={inputRef}
//             onChange={handleChange}
//             className="hidden"
//           />
//         </div>
//       ) : (
//         <div className="w-full p-4 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <FileText className="w-5 h-5" />
//             <div className="flex flex-col justify-center">
//               <p className="text-sm">{file.name}</p>
//               <p className="text-xs text-[#666666]">
//                 {(file.size / 1024).toFixed(0)} KB
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => setShowConfirm(true)}
//             className="self-start mt-1"
//           >
//             <X className="w-4 h-4 hover:cursor-pointer" strokeWidth={3} />
//           </button>
//         </div>
//       )}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-[#0000006d] bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-[#FFFBF3] rounded-lg p-4 w-80 shadow-lg">
//             <h2 className="text-2xl font-medium mb-2">Delete Document?</h2>
//             <p className="text-sm text-[#666666] mb-4">
//               You are about to delete document.
//               <br />
//               Are you sure you want to proceed?
//             </p>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleClear}
//                 className="hover:cursor-pointer px-12 py-2 border border-black rounded-3xl"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="bg-[#CC1D1D] hover:cursor-pointer text-white px-12 py-2 rounded-3xl"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentUpload;
