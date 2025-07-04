import React from "react";

// Props for ImageContainer
interface ImageContainerProps {
  src: string;
  alt: string;
  label?: string;
}

// Reusable component for displaying images
const ImageContainer: React.FC<ImageContainerProps> = ({ src, alt, label }) => (
  <div className="relative flex-1 flex items-center justify-center rounded-lg">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover rounded-lg"
    />
    {label && (
      <span className="absolute top-2 left-2 bg-white text-gray-800 text-sm px-2 py-1 rounded-md shadow">
        {label}
      </span>
    )}
  </div>
);

// Props for DisplayCarImage
interface DisplayCarImageProps {
  selectedImg: string;
}

const DisplayCarImage: React.FC<DisplayCarImageProps> = ({ selectedImg }) => {
  return <ImageContainer src={selectedImg} alt="Selected car image" label="AVAILABLE"/>;
};

export default DisplayCarImage;
