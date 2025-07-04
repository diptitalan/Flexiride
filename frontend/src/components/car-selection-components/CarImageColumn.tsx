import React from "react";

type CarImageColumnProps = {
  images: string[];
  setSelectedImg: (img: string) => void;
};

const CarImageColumn: React.FC<CarImageColumnProps> = ({ images, setSelectedImg }) => {
  return (
    <div className="flex flex-row lg:flex-col basis-full lg:basis-[15%] gap-4 overflow-y-auto max-h-full">
      {images.map((img, i) => (
        <div
          key={i}
          className="h-1/5 overflow-hidden cursor-pointer"
          onClick={() => setSelectedImg(img)}
        >
          <img
            src={img}
            alt={`Car thumbnail ${i + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default CarImageColumn;
