// import React,{useEffect,useState} from 'react';
// import CarGallery from './CarGallery';
// import DisplayCarCharacteristics from './DisplayCarCharacteristics';
// import FeedbackSection from './FeedbackSection';
// import axios from "axios";
// import { SelectedCarType,staticSelectedCar } from "../../types/SelectedCarType";
// import { RootState } from "../../store";
// import { useSelector } from 'react-redux';
// import {CarFeedback,staticCarFeedbacks} from "../../types/CarFeedback";
// const CarSelection: React.FC = () => {
//   const [selectedCarData,setSelectedCarData] = useState<SelectedCarType>(staticSelectedCar);
//   const [carFeedbacks,setCarFeedbacks] = useState<CarFeedback[]>(staticCarFeedbacks);
//   const selectedCar = useSelector((state: RootState) => state.selectedCar.carInfo?.selectedCarId);
//   useEffect(() => {
//     const fetchSelectedCarInfo = async () => {
//       try {
//         const url = `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/cars/${selectedCar}`;
//         const selectedCarResponse = await axios.get<{
//           data: SelectedCarType;
//         }>(url);
//         console.log(selectedCarResponse.data);
//         setSelectedCarData(selectedCarResponse.data.data);
//       } catch (err: any) {
//         setSelectedCarData(staticSelectedCar);
//         console.error('Error fetching car data:', err);
//       }
//     };
//     fetchSelectedCarInfo();
//   },[]);
//     useEffect(() => {
//     const fetchCarFeedbackInfo = async () => {
//       try {
//         const url = `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/cars/${selectedCar}/client-review`;
//         const selectedCarFeedbackResponse = await axios.get<{
//           data: CarFeedback[];
//         }>(url);
//         setCarFeedbacks(selectedCarFeedbackResponse.data.data);
//       } catch (err: any) {
//         setCarFeedbacks(staticCarFeedbacks);
//         console.error('Error fetching car feedback data:', err);
//       }
//     };
//     fetchCarFeedbackInfo();
//   },[]);

//   return (
//     <>
//       {/* Top half */}
//       <div className="w-full max-w-7xl mx-auto px-4">
//         <div className="flex flex-col lg:flex-row lg:h-[460px] m-4 p-4 gap-4">
//           {/* Left column + Middle column */}
//           <CarGallery carImages={selectedCarData.images}/>

//           {/* Right column */}
//           <DisplayCarCharacteristics carDetails={selectedCarData}/>
//         </div>
//       </div>

//       {/* Bottom half */}
//       <FeedbackSection feedbacks={carFeedbacks} />
//     </>
//   );
// };

// export default CarSelection

import React, { useEffect, useState } from "react";
import CarGallery from "./CarGallery";
import DisplayCarCharacteristics from "./DisplayCarCharacteristics";
import FeedbackSection from "./FeedbackSection";
import axios from "axios";
import {
  SelectedCarType,
  staticSelectedCar,
} from "../../types/SelectedCarType";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { CarFeedback, staticCarFeedbacks } from "../../types/CarFeedback";
import avtarImg from "../../assets/images/profile-pic.png";
const CarSelection: React.FC = () => {
  const [selectedCarData, setSelectedCarData] =
    useState<SelectedCarType>(staticSelectedCar);
  const [carFeedbacks, setCarFeedbacks] =
    useState<CarFeedback[]>(staticCarFeedbacks);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("DATE");
  const [sortDirection, setSortDirection] = useState<string>("DESC");

  const selectedCar = useSelector(
    (state: RootState) => state.selectedCar.carInfo?.selectedCarId
  );

  useEffect(() => {
    const fetchSelectedCarInfo = async () => {
      try {
        const url = `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/cars/${selectedCar}`;
        const selectedCarResponse = await axios.get<{ data: SelectedCarType }>(
          url
        );
        setSelectedCarData(selectedCarResponse.data.data);
      } catch (err: any) {
        setSelectedCarData(staticSelectedCar);
        console.error("Error fetching car data:", err);
      }
    };
    fetchSelectedCarInfo();
  }, [selectedCar]);

  const fetchCarFeedbackInfo = async (
    page: number,
    sort: string,
    direction: string
  ) => {
    try {
      const url = `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/cars/${selectedCar}/client-review?page=${page}&size=3&sort=${sort}&direction=${direction}`;
      const res = await axios.get(url);
      const content = res.data?.data?.content || [];
      const feedbacks: CarFeedback[] = content.map((fb: any) => ({
        author: fb.author,
        authorImageUrl: fb.authorImageUrl || avtarImg,
        rentalExperience: parseFloat(fb.rentalExperience),
        date: fb.date,
        text: fb.text,
      }));
      setCarFeedbacks(feedbacks);
      setTotalPages(res.data.data.totalPages || 1);
    } catch (err) {
      setCarFeedbacks(staticCarFeedbacks);
      console.error("Error fetching car feedback data:", err);
    }
  };

  useEffect(() => {
    if (selectedCar) {
      let sort = sortOption.includes("DATE") ? "DATE" : "RATING";
      fetchCarFeedbackInfo(currentPage, sort, sortDirection);
    }
  }, [selectedCar, currentPage, sortOption, sortDirection]);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:h-[460px] m-4 p-4 gap-4">
          <CarGallery carImages={selectedCarData.images.slice(1)} />
          <DisplayCarCharacteristics carDetails={selectedCarData} />
        </div>
      </div>
      <FeedbackSection
        feedbacks={carFeedbacks}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        sortOption={sortOption}
        setSortOption={(value) => {
          setSortOption(value);
          setSortDirection(value.includes("DESC") ? "DESC" : "ASC");
          setCurrentPage(1);
        }}
      />
    </>
  );
};

export default CarSelection;
