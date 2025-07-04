// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// import CardPagination from "../components/pagination-component/CardPagination";
// import CarSelector from "../components/mainpage-components/filter-component/CarSelector";
// import Heading from "../components/Heading-component/Heading";

// import { RootState } from "../store"; 
// import { buildFilterParams } from "../utils/buildFilterParams";
// import { CarsDataType, staticCarsData } from "../store/CarsData";

// const ITEMS_PER_PAGE = 12;

// const CarsPage: React.FC = () => {
//   const [cars, setCars] = useState<CarsDataType[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const filterInfo = useSelector((state: RootState) => state.appliedFilterInfo.filterInfo);

//   const fetchCars = useCallback(async (page: number) => {
//     setLoading(true);
//     const filterParams = {
//       ...buildFilterParams(filterInfo),
//       size: ITEMS_PER_PAGE.toString(),
//       page: page.toString(),
//     };

//     try {
//       const { data } = await axios.get<{
//         data: { content: CarsDataType[]; totalPages: number };
//       }>("https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/cars", { params: filterParams });

//       setCars(data.data.content);
//       setTotalPages(data.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching cars:", error);
//       setCars(staticCarsData);
//     } finally {
//       setLoading(false);
//     }
//   }, [filterInfo]);

//   useEffect(() => {
//     fetchCars(currentPage);
//   }, [fetchCars, currentPage]);

//   useEffect(() => {
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [filterInfo]);

//   return (
//     <>
//       <div className="px-4 py-8 bg-[#fffbf3] font-sans">
//         <Heading title="Choose a car for rental" />
//       </div>

//       <CarSelector />

//       <div className="w-full bg-[#fffbf3] py-8 px-4 sm:px-6 md:px-8 font-sans">
//         <CardPagination
//           data={cars}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//           loading={loading}
//         />
//       </div>
//     </>
//   );
// };

// export default CarsPage;

import React, { useEffect, useState, useCallback } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import CardPagination from "../components/pagination-component/CardPagination";
import CarSelector from "../components/mainpage-components/filter-component/CarSelector";
import Heading from "../components/Heading-component/Heading";

import { RootState } from "../store"; 
import { buildFilterParams } from "../utils/buildFilterParams";
import { CarsDataType, staticCarsData } from "../store/CarsData";
import {resetFilters} from "../store/slices/filterSlice"

const ITEMS_PER_PAGE = 12;

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<CarsDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const filterInfo = useSelector((state: RootState) => state.appliedFilterInfo.filterInfo);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const updateUrlParams = (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    navigate(`${location.pathname}?${query}`, { replace: true });
  };

  const fetchCars = useCallback(async (page: number) => {
    setLoading(true);

    const filterParams = {
      ...buildFilterParams(filterInfo),
      size: ITEMS_PER_PAGE.toString(),
      page: page.toString(),
    };

    updateUrlParams(filterParams);

    try {
      const { data } = await axios.get<{
        data: { content: CarsDataType[]; totalPages: number };
      }>("https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/cars", { params: filterParams });

      setCars(data.data.content);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars(staticCarsData);
    } finally {
      setLoading(false);
    }
  }, [filterInfo, location.pathname, navigate]);

  useEffect(() => {
    fetchCars(currentPage);
  }, [fetchCars, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterInfo]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetFilters());
  //   };
  // }, [dispatch]);

  return (
    <>
      <div className="px-4 py-8 bg-[#fffbf3] font-sans">
        <Heading title="Choose a car for rental" />
      </div>

      <CarSelector />

      <div className="w-full bg-[#fffbf3] py-8 px-4 sm:px-6 md:px-8 font-sans">
        <CardPagination
          data={cars}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          loading={loading}
        />
      </div>
    </>
  );
};

export default CarsPage;
