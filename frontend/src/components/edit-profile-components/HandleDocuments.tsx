import React, { useState } from "react";
import DocumentUpload from "./DocumentUpload";
import SaveProfileInfoBtn from "./SaveProfileInfoBtn";

import axios from "axios";

interface HandleDocumentsProps {
  userId: string;
  token: string;
}

const HandleDocuments: React.FC<HandleDocumentsProps> = ({ userId, token }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const id = userInfo?.userId;

  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState<Record<string, File | null>>({
    passportFront: null,
    passportBack: null,
    licenseFront: null,
    licenseBack: null,
  });

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [key]: file,
      }));
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // remove "data:*/*;base64,"
      reader.onerror = (error) => reject(error);
    });

  const handleSetFile = (key: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSave = async () => {
    try {
      const { passportFront, passportBack, licenseFront, licenseBack } = files;

      const hasPassport = passportFront && passportBack;
      const hasLicense = licenseFront && licenseBack;

      if (!hasPassport && !hasLicense) {
        alert("Please upload both front and back side of either Passport or Driving License.");
        return;
      }

      setIsLoading(true);

      // const passportFrontData = await toBase64(passportFront);
      // const passportBackData = await toBase64(passportBack);
      // const licenseFrontData = await toBase64(licenseFront);
      // const licenseBackData = await toBase64(licenseBack);

      // const documentsPayload = [
      //   {
      //     documentType: "passport",
      //     frontImage: {
      //       data: passportFrontData,
      //       fileName: passportFront.name,
      //       mimeType: passportFront.type,
      //     },
      //     backImage: {
      //       data: passportBackData,
      //       fileName: passportBack.name,
      //       mimeType: passportBack.type,
      //     },
      //   },
      //   {
      //     documentType: "driving_license",
      //     frontImage: {
      //       data: licenseFrontData,
      //       fileName: licenseFront.name,
      //       mimeType: licenseFront.type,
      //     },
      //     backImage: {
      //       data: licenseBackData,
      //       fileName: licenseBack.name,
      //       mimeType: licenseBack.type,
      //     },
      //   },
      // ];
      
      const documentsPayload = [];

      if (hasPassport) {
        documentsPayload.push({
          documentType: "passport",
          frontImage: {
            data: await toBase64(passportFront),
            fileName: passportFront.name,
            mimeType: passportFront.type,
          },
          backImage: {
            data: await toBase64(passportBack),
            fileName: passportBack.name,
            mimeType: passportBack.type,
          },
        });
      }

      if (hasLicense) {
        documentsPayload.push({
          documentType: "driving_license",
          frontImage: {
            data: await toBase64(licenseFront),
            fileName: licenseFront.name,
            mimeType: licenseFront.type,
          },
          backImage: {
            data: await toBase64(licenseBack),
            fileName: licenseBack.name,
            mimeType: licenseBack.type,
          },
        });
      }

      const response = await axios.put(
        `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/users/${id}/personal-info`,
        { documents: documentsPayload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Documents uploaded successfully");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl font-semibold mb-6">Documents</h1>
      </div>

      <h2 className="text-xl font-medium mb-4">Passport Details</h2>
      <div className="border rounded-lg p-4 border-black mb-4">
        <DocumentUpload
          label="Front side"
          file={files.passportFront}
          setFile={(file) => handleSetFile("passportFront", file)}
        />
        <DocumentUpload
          label="Back side"
          file={files.passportBack}
          setFile={(file) => handleSetFile("passportBack", file)}
        />
      </div>

      <h2 className="text-xl font-medium mb-4">Driving License</h2>
      <div className="border rounded-lg p-4 border-black mb-4">
        <DocumentUpload
          label="Front side"
          file={files.licenseFront}
          setFile={(file) => handleSetFile("licenseFront", file)}
        />
        <DocumentUpload
          label="Back side"
          file={files.licenseBack}
          setFile={(file) => handleSetFile("licenseBack", file)}
        />
      </div>

      <div className="flex justify-center md:justify-end pt-4">
        {isLoading && (
          <div className="mb-2 mx-4">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#CC1D1D] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        <SaveProfileInfoBtn
          label={isLoading ? "Uploading..." : "Save Changes"}
          onClick={handleSave}
        />
      </div>
    </>
  );
};

export default HandleDocuments;
