import React, { useState } from "react";
import CarImageColumn from "./CarImageColumn";
import DisplayCarImage from "./DisplayCarImage";
// import { carLeftImages } from "../../store/CarImages";

interface CarGalleryProps {
  carImages: string[];
}

const CarGallery: React.FC<CarGalleryProps> = ({ carImages }) => {
  const [selectedImg, setSelectedImg] = useState<string>(carImages[1]);
  return (
    <div className="lg:w-[60%] flex flex-col lg:flex-row gap-4">
      <CarImageColumn
        images={carImages.slice(1)}
        setSelectedImg={setSelectedImg}
      />
      <DisplayCarImage selectedImg={selectedImg} />
    </div>
  );
};

export default CarGallery;
