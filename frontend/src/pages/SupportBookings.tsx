// import React, { useState, useEffect, useRef } from "react";
// import { DateRange } from "react-date-range";
// import { format } from "date-fns";
// import { useSelector } from "react-redux";
// import { ChevronDown } from "lucide-react";
// import Heading from "../../src/components/Heading-component/Heading";
// import Button from "../../src/components/mainpage-components/button-component/Button";
// import DropDown from "../../src/components/mainpage-components/filter-component/dropdown-component/Dropdown";
// import axios from "axios";
// import { RootState } from "../store";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

// interface BookingsPageProps {
//     bookings: any[]; // already contains populated client and car info
// }
// interface Booking {
//     _id: string,
//     date: string,
//     bookingPeriod: string,
//     bookingNumber: string;
//     clientName: string,
//     carModel: string,
//     clientId: {
//         firstName?: string;
//         username?: string;
//         _id: string;
//     } | null;
//     carId: {
//         model?: string;
//     } | null;
//     madeBy: string;
//     bookingStatus: string;
//     pickupDateTime: string;
//     dropOffDateTime: string;
// }
// const BookingsPage: React.FC<BookingsPageProps> = ({ }) => {
//     const [selectedStatus, setSelectedStatus] = useState("");
//     const [selectedClient, setSelectedClient] = useState("");
    
//     const [dateRange, setDateRange] = useState(
//         [
//             {
//                 startDate: new Date(),
//                 endDate: new Date(),
//                 key: "selection",
//             },
//         ]
//     );
//     const [showDatePicker, setShowDatePicker] = useState(false);


//     const handleCreateBooking = () => {
//         console.log("Create booking clicked");
//     };

//     const bookingStatusOptions = [
//         "RESERVED",
//         "SERVICE STARTED",
//         "SERVICE PROVIDED",
//         "BOOKING FINISHED",
//         "CANCELED"
//     ];

//     const [bookings, setBookings] = useState<Booking[]>([]);
//     const [loading, setLoading] = useState(true);


//     const token = useSelector((state: RootState) => state.user.userInfo?.idToken);

//     const buildQueryParams = () => {
//         const params = new URLSearchParams();

//         const dateFrom = dayjs(dateRange[0].startDate).format("YYYY-MM-DD");
//         const dateTo = dayjs(dateRange[0].endDate).format("YYYY-MM-DD");

//         params.append("dateFrom", dateFrom);
//         params.append("dateTo", dateTo);

//         // If a client is selected, find their _id from the populated booking list
//         if (selectedClient) {
//             const selectedClientId = bookings.find(
//                 (b) => b.clientId?.firstName === selectedClient
//             )?.clientId?._id;

//             if (selectedClientId) {
//                 params.append("clientId", selectedClientId);
//             }
//         }

//         return params;
//     };

//     const fetchBookings = async () => {
//         try {
//             const params = buildQueryParams();
//             const response = await fetch(`https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/bookings?${params.toString()}`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch bookings');
//             }

//             const data = await response.json();
//             setBookings(data?.data?.content || []);
//             console.log("Fetched data:", data);
//         } catch (error) {
//             console.error('Error fetching bookings:', error);
//         } finally {
//             setLoading(false);
//         }

//     };
//     const datePickerRef = useRef<HTMLDivElement>(null);
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 showDatePicker &&
//                 datePickerRef.current &&
//                 !datePickerRef.current.contains(event.target as Node)
//             ) {
//                 setShowDatePicker(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [showDatePicker]);


//     useEffect(() => {
//         fetchBookings();
//     }, [dateRange, selectedClient]);
//     // {if (typeof b.clientId === "object" && b.clientId?.firstName)
//     const clientOptions = Array.from(
//         new Set(bookings.map((b) => {
//             if (b.clientName) {
//                 return b.clientName;
//             }

//             return "-";
//         }))
//     )
//     const filteredBookings = bookings.filter((booking) => {
//         const matchesClient =
//             !selectedClient || booking.clientName === selectedClient;
//         const matchesStatus =
//             !selectedStatus || booking.bookingStatus === selectedStatus;

//         return matchesClient && matchesStatus;
//     });


//     return (
//         <div className="p-6 bg-[#FFFBF3] min-h-screen font-sans">
//             {/* Heading and Create Button */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//                 <Heading title="Bookings" />
//                 <div className="w-full md:w-auto px-0">
//                     <Button onClick={handleCreateBooking}>Create new booking</Button>
//                 </div>
//             </div>

//             {/* Filters */}
//             <div className="flex flex-col md:flex-row gap-4 items-start md:items-end mb-6 ">
//                 {/* Date Range Picker Dropdown */}
//                 <div className="flex flex-col">
//                     <label className="text-gray-800 text-[13px] font-medium mb-1">Date range</label>
//                     <div className="relative " ref={datePickerRef}>
//                         <button
//                             onClick={() => setShowDatePicker(!showDatePicker)}
//                             className="flex items-center justify-between gap-2 text-[13px] bg-[#fffbf3] border border-gray-300 rounded-md py-2 px-3 w-full md:min-w-[200px]"
//                         >
//                             <span>
//                                 {`${format(dateRange[0].startDate, "MMM dd")} - ${format(dateRange[0].endDate, "MMM dd yyyy")}`}
//                             </span>
//                             <ChevronDown className="w-4 h-4 ml-2 text-gray-600" />
//                         </button>
//                         {showDatePicker && (
//                             <div className="absolute z-10 mt-2 shadow-lg">
//                                 <DateRange
//                                     editableDateInputs={true}
//                                     onChange={(item: { selection: any }) => setDateRange([item.selection])}
//                                     moveRangeOnFirstSelection={false}
//                                     ranges={dateRange}
//                                     className="bg-white"
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Client Dropdown */}
//                 <DropDown
//                     label="Client"
//                     options={clientOptions}
//                     value={selectedClient}
//                     onChange={setSelectedClient}
//                 />

//                 {/* Booking Status Dropdown */}
//                 <DropDown
//                     label="Booking status"
//                     options={bookingStatusOptions}
//                     value={selectedStatus}
//                     onChange={setSelectedStatus}
//                 />

//                 {/* Reset Filters */}
//                 <div className="flex items-center h-[42px] ">
//                     <div
//                         className="text-sm text-red-600 font-medium cursor-pointer"
//                         onClick={() => {
                            
//                             setSelectedClient("");
//                             setSelectedStatus("");
//                             setDateRange([
//                                 {
//                                     startDate: new Date(),
//                                     endDate: new Date(),
//                                     key: "selection",
//                                 },
//                             ]);
//                         }}
//                     >
//                         Apply filters
//                     </div>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto bg-white rounded-md shadow">
//                 <table className="min-w-full text-sm text-left">
//                     <thead className="bg-black text-white">
//                         <tr>
//                             <th className="px-4 py-3  border border-gray-300">Date</th>
//                             <th className="px-4 py-3  border border-gray-300">Booking number</th>
//                             <th className="px-4 py-3  border border-gray-300">Client</th>
//                             <th className="px-4 py-3  border border-gray-300">Car</th>
//                             <th className="px-4 py-3  border border-gray-300">Made by</th>
//                             <th className="px-4 py-3  border border-gray-300">Booking status</th>
//                             <th className="px-4 py-3  border border-gray-300">Booking period</th>
//                             <th className="px-4 py-3  border border-gray-300">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredBookings.map((booking) => {






//                             return (
//                                 <tr key={booking._id} className="border-t bg-[#fffbf3]">
//                                     <td className="px-4 py-2 border border-gray-300">{booking.date}</td>
//                                     <td className="px-4 py-2  border border-gray-300">{booking.bookingNumber.split("-")[2]}</td>

//                                     <td className="px-4 py-2 border border-gray-300">{booking.clientName || "-"}</td>
//                                     <td className="px-4 py-2 truncate border border-gray-300">{booking.carModel || "-"}</td>
//                                     <td className="px-4 py-2 border border-gray-300">{booking.madeBy}</td>
//                                     <td className="px-4 py-2 border border-gray-300">{booking.bookingStatus}</td>
//                                     <td className="px-4 py-2 border border-gray-300">{booking.bookingPeriod}</td>
//                                     <td className="px-4 py-2 text-right border border-gray-300"
//                                     >⋯</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default BookingsPage;
import React, { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { ChevronDown } from "lucide-react";
import Heading from "../../src/components/Heading-component/Heading";
import Button from "../../src/components/mainpage-components/button-component/Button";
import DropDown from "../../src/components/mainpage-components/filter-component/dropdown-component/Dropdown";
import axios from 'axios';

import { RootState } from "../store";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
interface Booking {
  bookingId: string;
  bookingNumber: string;
  bookingPeriod: string;
  carModel: string;
  clientName: string;
  date: string;
  location: string;
  bookingStatus: string;
  madeBy: string;
}

const BookingsPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const datePickerRef = useRef(null);

  const token = useSelector((state: RootState) => state.user.userInfo?.idToken);

  const fetchBookings = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: filters,
        }
      );

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch bookings");
      }

      setBookings(
        data.data.content.map((item: any) => ({
          bookingId: item.bookingId,
          bookingNumber: item.bookingNumber,
          bookingPeriod: item.bookingPeriod,
          carModel: item.carModel,
          clientName: item.clientName,
          date: item.date,
          location: item.location,
          bookingStatus: item.bookingStatus,
          madeBy: item.madeBy,
        }))
      );
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings({
      clientId: "6807cdc6e876bf45dbde7e14",
      dateFrom: "2025-04-01T07:07",
      dateTo: "2025-05-17T07:07",
    });
  }, []);

  const clientOptions = Array.from(new Set(bookings.map((b) => b.clientName)));

  const applyFilters = () => {
    const filters: any = {};

    if (selectedClient) filters.clientName = selectedClient;
    if (selectedStatus) filters.bookingStatus = selectedStatus;

    if (dateRange[0].startDate) {
      filters.dateFrom = dateRange[0].startDate.toISOString().split("T")[0];
    }
    if (dateRange[0].endDate) {
      filters.dateTo = dateRange[0].endDate.toISOString().split("T")[0];
    }

    fetchBookings(filters);
  };

  const bookingStatusOptions = [
    "RESERVED",
    "SERVICE STARTED",
    "SERVICE PROVIDED",
    "BOOKING FINISHED",
    "CANCELED",
  ];

  const handleCreateBooking = () => {
    // Replace with actual create booking logic or navigation
    console.log("Create booking clicked");
  };

  return (
    <div className="p-6 bg-[#FFFBF3] min-h-screen font-sans">
      {/* Heading and Create Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Heading title="Bookings" />
        <div className="w-full md:w-auto px-0">
          <Button onClick={handleCreateBooking}>Create new booking</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end mb-6">
        {/* Date Range Picker */}
        <div className="flex flex-col">
          <label className="text-gray-800 text-[13px] font-medium mb-1">
            Date range
          </label>
          <div className="relative" ref={datePickerRef}>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center justify-between gap-2 text-[13px] bg-[#fffbf3] border border-gray-300 rounded-md py-2 px-3 w-full md:min-w-[200px]"
            >
              <span>
                {`${format(dateRange[0].startDate, "MMM dd")} - ${format(
                  dateRange[0].endDate,
                  "MMM dd yyyy"
                )}`}
              </span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-600" />
            </button>
            {showDatePicker && (
              <div className="absolute z-10 mt-2 shadow-lg">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item: { selection: any }) =>
                    setDateRange([item.selection])
                  }
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  className="bg-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Client Dropdown */}
        <DropDown
          label="Client"
          options={clientOptions}
          value={selectedClient}
          onChange={setSelectedClient}
        />

        {/* Booking Status Dropdown */}
        <DropDown
          label="Booking status"
          options={bookingStatusOptions}
          value={selectedStatus}
          onChange={setSelectedStatus}
        />

        {/* Apply Filters Button */}
        <div className="flex items-center h-[42px]">
          <div
            className="text-sm text-red-600 font-medium cursor-pointer"
            onClick={applyFilters}
          >
            Apply filters
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-3 border border-gray-300">Date</th>
              <th className="px-4 py-3 border border-gray-300">
                Booking number
              </th>
              <th className="px-4 py-3 border border-gray-300">Client</th>
              <th className="px-4 py-3 border border-gray-300">Car</th>
              <th className="px-4 py-3 border border-gray-300">Made by</th>
              <th className="px-4 py-3 border border-gray-300">Status</th>
              <th className="px-4 py-3 border border-gray-300">Period</th>
              <th className="px-4 py-3 border border-gray-300">Location</th>
              <th className="px-4 py-3 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId} className="border-t bg-[#fffbf3]">
                <td className="px-4 py-2 border border-gray-300">
                  {booking.date}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {booking.bookingNumber}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {booking.clientName}
                </td>
                <td className="px-4 py-2 truncate border border-gray-300">
                  {booking.carModel}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {booking.madeBy}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {booking.bookingStatus}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {booking.bookingPeriod}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {booking.location}
                </td>
                <td className="px-4 py-2 text-right border border-gray-300">
                  ⋯
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsPage;
