// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../../store";
// import { setAllFilters } from "../../../store/slices/filterSlice";
// import Button from "../button-component/Button";
// import DropDown from "./dropdown-component/Dropdown";
// import PriceSlider from "./Slider";
// import FilterInfo from "../../../types/FilterInfo";
// import { useNavigate } from "react-router";

// const CATEGORIES = [
//   "ECONOMY",
//   "COMFORT",
//   "BUSINESS",
//   "PREMIUM",
//   "CROSSOVER",
//   "MINIVAN",
//   "ELECTRIC",
// ];
// const GEARBOXES = ["AUTOMATIC", "MANUAL"];
// const ENGINES = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"];
// const PRICE_MIN = 54;
// const PRICE_MAX = 400;

// const defaultFilters: FilterInfo = {
//   pickupLocation: "",
//   dropoffLocation: "",
//   pickupDateTime: "",
//   dropoffDateTime: "",
//   category: "",
//   gearBoxType: "",
//   engineType: "",
//   minPrice: PRICE_MIN,
//   maxPrice: PRICE_MAX,
// };

// const CarSelector: React.FC = () => {
//   const dispatch = useDispatch();
//   const [filters, setFilters] = useState<FilterInfo>(defaultFilters);
//   const [toastMessage, setToastMessage] = useState<string>("");
//   const [dateError, setDateError] = useState("");
//   const serviceLocationIdInfo = useSelector(
//     (state: RootState) => state.serviceLocation.idToName
//   );
//   const serviceLocationNameInfo = useSelector(
//     (state: RootState) => state.serviceLocation.nameToId
//   );

//   const navigate = useNavigate();
//   const allLocations = Object.keys(serviceLocationNameInfo);

//   const PICKUP_LOCATIONS = allLocations.filter(
//     (name) => serviceLocationNameInfo[name] !== filters.dropoffLocation
//   );
//   const DROP_LOCATIONS = allLocations.filter(
//     (name) => serviceLocationNameInfo[name] !== filters.pickupLocation
//   );

//   const updateFilter = <K extends keyof FilterInfo>(
//     key: K,
//     value: FilterInfo[K]
//   ) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSearch = () => {
//     const {
//       pickupLocation,
//       dropoffLocation,
//       pickupDateTime,
//       dropoffDateTime,
//       category,
//     } = filters;

//     if (
//       !pickupLocation ||
//       !dropoffLocation ||
//       !pickupDateTime ||
//       !dropoffDateTime ||
//       !category
//     ) {
//       setToastMessage("Please fill all required fields before searching.");
//       return;
//     }

//     setToastMessage("");
//     dispatch(setAllFilters(filters));
//     navigate("/cars");
//   };

//   const clearAll = () => {
//     dispatch(setAllFilters(defaultFilters));
//     setFilters(defaultFilters);
//   };

//   return (
//     <div className="bg-[#fffbf3] px-4 py-6 relative">
//       <div className="border border-gray-400 rounded-lg px-4 py-6">
//         <div className="mb-6">
//           <button
//             onClick={clearAll}
//             className="absolute top-5 right-6 md:right-8 text-[#ea384c] text-sm font-medium hover:underline focus:outline-none transition-colors z-10 p-0 bg-transparent mt-2"
//           >
//             Clear all filters
//           </button>
//         </div>

//         {toastMessage && (
//           <div className="absolute top-3 left-3 right-3 bg-red-100 border border-red-600 text-red-700 px-4 py-2 rounded-md shadow-sm text-sm flex justify-between items-center z-10">
//             <span>{toastMessage}</span>
//             <button
//               onClick={() => setToastMessage("")}
//               className="text-lg font-bold"
//             >
//               &times;
//             </button>
//           </div>
//         )}

//         {/* Top Filter Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <DropDown
//             label="Pick-up location"
//             options={PICKUP_LOCATIONS}
//             value={
//               filters.pickupLocation
//                 ? serviceLocationIdInfo[filters.pickupLocation] || ""
//                 : ""
//             }
//             onChange={(selectedName) =>
//               updateFilter(
//                 "pickupLocation",
//                 serviceLocationNameInfo[selectedName]
//               )
//             }
//             grayLabel
//             required
//           />
//           <DropDown
//             label="Drop-off location"
//             options={DROP_LOCATIONS}
//             value={
//               filters.dropoffLocation
//                 ? serviceLocationIdInfo[filters.dropoffLocation] || ""
//                 : ""
//             }
//             onChange={(selectedName) =>
//               updateFilter(
//                 "dropoffLocation",
//                 serviceLocationNameInfo[selectedName]
//               )
//             }
//             grayLabel
//             required
//           />
//           <div className="flex flex-col">
//             <label className="text-gray-500 text-[13px] font-medium mb-1">
//               Pick-up Date <span className="text-red-500 text-xs">*</span>
//             </label>
//             <input
//               type="datetime-local"
//               value={filters.pickupDateTime}
//               min={new Date().toISOString().slice(0, 16)}
//               onChange={(e) => updateFilter("pickupDateTime", e.target.value)}
//               className="p-2 text-[13px] border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-gray-500 text-[13px] font-medium mb-1">
//               Drop-off Date <span className="text-red-500 text-xs">*</span>
//             </label>
//             <input
//               type="datetime-local"
//               value={filters.dropoffDateTime}
//               min={filters.pickupDateTime}
//               onChange={(e) => {
//                 const dropoff = e.target.value;
//                 if (new Date(dropoff) <= new Date(filters.pickupDateTime)) {
//                   alert("Drop-off date and time must be after pick-up date and time.");
//                   return;
//                 }
//                 updateFilter("dropoffDateTime", dropoff);
//               }}
//               className="p-2 text-[13px] border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>

//         {/* Lower Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
//           <DropDown
//             label="Car category"
//             options={CATEGORIES}
//             value={filters.category}
//             onChange={(value) => updateFilter("category", value)}
//             grayLabel
//             required
//           />
//           <DropDown
//             label="Gearbox"
//             options={GEARBOXES}
//             value={filters.gearBoxType}
//             onChange={(value) => updateFilter("gearBoxType", value)}
//             grayLabel
//           />
//           <DropDown
//             label="Type of engine"
//             options={ENGINES}
//             value={filters.engineType}
//             onChange={(value) => updateFilter("engineType", value)}
//             grayLabel
//           />
//           <div className="flex flex-col min-w-[160px]">
//             <div className="flex flex-col gap-2">
//               <PriceSlider
//                 value={[filters.minPrice, filters.maxPrice]}
//                 onValueChange={([min, max]) => {
//                   updateFilter("minPrice", min);
//                   updateFilter("maxPrice", max);
//                 }}
//                 min={PRICE_MIN}
//                 max={PRICE_MAX}
//               />
//             </div>
//           </div>
//           <div>
//             <Button onClick={handleSearch}>Find a car</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarSelector;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setAllFilters } from "../../../store/slices/filterSlice";
import Button from "../button-component/Button";
import DropDown from "./dropdown-component/Dropdown";
import PriceSlider from "./Slider";
import FilterInfo from "../../../types/FilterInfo";
import { useNavigate } from "react-router";

const CATEGORIES = [
  "ECONOMY",
  "COMFORT",
  "BUSINESS",
  "PREMIUM",
  "CROSSOVER",
  "MINIVAN",
  "ELECTRIC",
];
const GEARBOXES = ["AUTOMATIC", "MANUAL"];
const ENGINES = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"];
const PRICE_MIN = 54;
const PRICE_MAX = 400;

const defaultFilters: FilterInfo = {
  pickupLocation: "",
  dropoffLocation: "",
  pickupDateTime: "",
  dropoffDateTime: "",
  category: "",
  gearBoxType: "",
  engineType: "",
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
};

const CarSelector: React.FC = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<FilterInfo>(defaultFilters);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [errors, setErrors] = useState({
    pickupDate: false,
    dropoffDate: false,
  });

  const serviceLocationIdInfo = useSelector(
    (state: RootState) => state.serviceLocation.idToName
  );
  const serviceLocationNameInfo = useSelector(
    (state: RootState) => state.serviceLocation.nameToId
  );

  const navigate = useNavigate();
  const allLocations = Object.keys(serviceLocationNameInfo);

  const PICKUP_LOCATIONS = allLocations.filter(
    (name) => serviceLocationNameInfo[name] !== filters.dropoffLocation
  );
  const DROP_LOCATIONS = allLocations.filter(
    (name) => serviceLocationNameInfo[name] !== filters.pickupLocation
  );

  const updateFilter = <K extends keyof FilterInfo>(
    key: K,
    value: FilterInfo[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const isPastDate = (value: string) => new Date(value) < new Date();
  const isBeforePickup = (dropoff: string, pickup: string) =>
    new Date(dropoff) <= new Date(pickup);

  const handleSearch = () => {
    const {
      pickupLocation,
      dropoffLocation,
      pickupDateTime,
      dropoffDateTime,
      category,
    } = filters;

    const pickupDateInvalid = !pickupDateTime || isPastDate(pickupDateTime);
    const dropoffDateInvalid =
      !dropoffDateTime || isBeforePickup(dropoffDateTime, pickupDateTime);

    if (
      !pickupLocation ||
      !dropoffLocation ||
      !pickupDateTime ||
      !dropoffDateTime ||
      !category ||
      pickupDateInvalid ||
      dropoffDateInvalid
    ) {
      setToastMessage("Please fill all required fields before searching.");
      setErrors({
        pickupDate: pickupDateInvalid,
        dropoffDate: dropoffDateInvalid,
      });
      return;
    }

    setErrors({ pickupDate: false, dropoffDate: false });
    setToastMessage("");
    dispatch(setAllFilters(filters));
    navigate("/cars");
  };

  const clearAll = () => {
    dispatch(setAllFilters(defaultFilters));
    setFilters(defaultFilters);
    setErrors({ pickupDate: false, dropoffDate: false });
  };

  return (
    <div className="bg-[#fffbf3] px-4 py-6 relative">
      <div className="border border-gray-400 rounded-lg px-4 py-6">
        <div className="mb-6">
          <button
            onClick={clearAll}
            className="absolute top-5 right-6 md:right-8 text-[#ea384c] text-sm font-medium hover:underline focus:outline-none transition-colors z-10 p-0 bg-transparent mt-2"
          >
            Clear all filters
          </button>
        </div>

        {toastMessage && (
          <div className="absolute top-3 left-3 right-3 bg-red-100 border border-red-600 text-red-700 px-4 py-2 rounded-md shadow-sm text-sm flex justify-between items-center z-10">
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage("")}
              className="text-lg font-bold"
            >
              &times;
            </button>
          </div>
        )}

        {/* Top Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <DropDown
            label="Pick-up location"
            options={PICKUP_LOCATIONS}
            value={
              filters.pickupLocation
                ? serviceLocationIdInfo[filters.pickupLocation] || ""
                : ""
            }
            onChange={(selectedName) =>
              updateFilter(
                "pickupLocation",
                serviceLocationNameInfo[selectedName]
              )
            }
            grayLabel
            required
          />
          <DropDown
            label="Drop-off location"
            options={DROP_LOCATIONS}
            value={
              filters.dropoffLocation
                ? serviceLocationIdInfo[filters.dropoffLocation] || ""
                : ""
            }
            onChange={(selectedName) =>
              updateFilter(
                "dropoffLocation",
                serviceLocationNameInfo[selectedName]
              )
            }
            grayLabel
            required
          />
          <div className="flex flex-col">
            <label className="text-gray-500 text-[13px] font-medium mb-1">
              Pick-up Date <span className="text-red-500 text-xs">*</span>
            </label>
            <input
              type="datetime-local"
              value={filters.pickupDateTime}
              onChange={(e) => {
                const value = e.target.value;
                const isInvalid = isPastDate(value);
                setErrors((prev) => ({ ...prev, pickupDate: isInvalid }));
                updateFilter("pickupDateTime", value);
              }}
              className="p-2 text-[13px] border border-gray-300 rounded-md"
            />
            {errors.pickupDate && (
              <span className="text-red-500 text-xs mt-1">Invalid date</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 text-[13px] font-medium mb-1">
              Drop-off Date <span className="text-red-500 text-xs">*</span>
            </label>
            <input
              type="datetime-local"
              value={filters.dropoffDateTime}
              onChange={(e) => {
                const value = e.target.value;
                const isInvalid = isBeforePickup(value, filters.pickupDateTime);
                setErrors((prev) => ({ ...prev, dropoffDate: isInvalid }));
                updateFilter("dropoffDateTime", value);
              }}
              className="p-2 text-[13px] border border-gray-300 rounded-md"
            />
            {errors.dropoffDate && (
              <span className="text-red-500 text-xs mt-1">Invalid date</span>
            )}
          </div>
        </div>

        {/* Lower Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
          <DropDown
            label="Car category"
            options={CATEGORIES}
            value={filters.category}
            onChange={(value) => updateFilter("category", value)}
            grayLabel
            required
          />
          <DropDown
            label="Gearbox"
            options={GEARBOXES}
            value={filters.gearBoxType}
            onChange={(value) => updateFilter("gearBoxType", value)}
            grayLabel
          />
          <DropDown
            label="Type of engine"
            options={ENGINES}
            value={filters.engineType}
            onChange={(value) => updateFilter("engineType", value)}
            grayLabel
          />
          <div className="flex flex-col min-w-[160px]">
            <PriceSlider
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) => {
                updateFilter("minPrice", min);
                updateFilter("maxPrice", max);
              }}
              min={PRICE_MIN}
              max={PRICE_MAX}
            />
          </div>
          <div>
            <Button onClick={handleSearch}>Find a car</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSelector;
