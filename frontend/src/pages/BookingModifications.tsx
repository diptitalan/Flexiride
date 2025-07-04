import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import audiImage from "../assets/images/audi.jpg";
import CarCartCard from "../components/car-booking-compenents/CarCartCard";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SelectedCarType } from "../types/SelectedCarType";
import Header from "../components/header-component/Header";
import Footer from "../components/footer-component/Footer";
import { setFilter } from "../store/slices/filterSlice";

interface SelectedCarInfo {
  selectedCarId: string | number;
  carName: string;
  carLocation: string;
  carImage: string;
  carPrice: number;
  carDeposit: number;
}
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");

const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;


const BookingModification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingIdParam = useParams<{ bookingId: string }>().bookingId;
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const appliedFilterInfo = useSelector(
    (state: RootState) => state.appliedFilterInfo.filterInfo
  );
  const serviceLocationIdInfo = useSelector(
    (state: RootState) => state.serviceLocation.idToName
  );
  const serviceLocationNameInfo = useSelector(
    (state: RootState) => state.serviceLocation.nameToId
  );
  const selectedCarId = useSelector(
    (state: RootState) => state.selectedCar.carInfo?.selectedCarId
  );
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [pickupLocation, setPickupLocation] = useState(
    serviceLocationIdInfo[appliedFilterInfo.pickupLocation]
  );
  const [dropoffLocation, setDropoffLocation] = useState(
    serviceLocationIdInfo[appliedFilterInfo.dropoffLocation]
  );
  const [pickupDateTime, setPickupDateTime] = useState(
    appliedFilterInfo.pickupDateTime || "2023-11-16T10:00"
  );
  const [dropoffDateTime, setDropoffDateTime] = useState(
    appliedFilterInfo.dropoffDateTime || "2023-11-20T10:00"
  );

  const [selectedCarInfo, setSelectedCarInfo] = useState<SelectedCarInfo>({
    selectedCarId: selectedCarId || "",
    carName: "Audi A6 Quattro 2023",
    carLocation: "Ukraine, Kyiv",
    carImage: audiImage,
    carPrice: 900,
    carDeposit: 2000,
  });

  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingDates, setIsEditingDates] = useState(false);

  const user = {
    name: userInfo?.username || "John Doe",
    email: userInfo?.email || "example@gmail.com",
    phone: "+380 123 456 789",
  };

  const orderId = "32457 081124";

  const handleConfirm = async () => {
    try {
      const token = userInfo?.idToken;
      const data = {
        bookingId: bookingIdParam,
        pickupDateTime: appliedFilterInfo.pickupDateTime,
        dropOffDateTime: appliedFilterInfo.dropoffDateTime,
        pickupLocationId: serviceLocationNameInfo[pickupLocation],
        dropOffLocationId: serviceLocationNameInfo[dropoffLocation],
      };
      console.log(JSON.stringify(data));
      const response = await axios.put(
        "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/bookings/edit",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setShowSuccess(true);
      setTimeout(()=>{navigate("/mybookings")}, 3000);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setIsUnavailable(true);
      } else {
        console.error("Booking failed:", err);
      }
    }
  };

  useEffect(() => {
    if (!selectedCarId) return;
    const fetchSelectedCarInfo = async () => {
      try {
        const url = `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/cars/${selectedCarId}`;
        const selectedCarResponse = await axios.get<{ data: SelectedCarType }>(
          url
        );
        const carData = selectedCarResponse.data.data;
        setSelectedCarInfo({
          selectedCarId: carData.carId,
          carName: carData.model,
          carLocation: carData.location,
          carImage: audiImage,
          carPrice: Number(carData.pricePerDay),
          carDeposit: 2000,
        });
      } catch (err: any) {
        console.error("Error fetching car data:", err);
      }
    };
    fetchSelectedCarInfo();
  }, [selectedCarId]);

  return (
    <>
      <Header />
      <div
        className={`bg-[#FFFCF7] min-h-screen flex flex-col justify-between text-sm ${
          isUnavailable ? "opacity-60" : ""
        }`}
      >
        <main className="px-8 py-2 max-w-6xl w-full relative ml-[-10px] flex-grow">
          {showSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">🎉 Congratulations!</p>
                  <p>
                    {selectedCarInfo.carName} is booked from{" "}
                    <strong>{pickupDateTime.split("T").join(" ")}</strong> to{" "}
                    <strong>{dropoffDateTime.split("T").join(" ")}</strong>.
                    <br />
                    You can change booking details under{" "}
                    <Link to="/mybookings" className="underline">
                      My bookings
                    </Link>
                    .<br />
                    Your order: <strong>{orderId}</strong>
                  </p>
                </div>
                <button
                  className="ml-4 text-lg font-bold text-green-700 hover:text-green-900"
                  onClick={() => setShowSuccess(false)}
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <div className="text-gray-500 mb-2">Cars &gt; Modify booking</div>
          <h1
            className="font-sans mb-6"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "56px" }}
          >
            Booking Modification
          </h1>

          <div
            className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-6 items-start min-h-screen p-6"
            style={{ backgroundColor: "#FFFCF7" }}
          >
            <div className="flex flex-col gap-6 w-full">
              {/* Personal Info */}
              <div>
                <h2 className="font-bold text-[24px] text-base mb-2">
                  Personal info
                </h2>
                <div className="border rounded-lg p-4 bg-transparent">
                  <p className="font-bold text-[14px]">{user.name}</p>
                  <p className="text-gray-500 text-[14px]">{user.email}</p>
                  <p className="text-gray-500 text-[14px]">{user.phone}</p>
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="font-bold text-base mb-2 text-[24px]">
                  Location
                </h2>
                <div className="relative border rounded-lg p-4 bg-transparent">
                  <button
                    className="absolute top-4 right-4 text-black-500 font-semibold text-sm"
                    type="button"
                    onClick={() => setIsEditingLocation(!isEditingLocation)}
                  >
                    {isEditingLocation ? "Save" : "Change"}
                  </button>
                  <div className="space-y-2">
                    {isEditingLocation ? (
                      <>
                        <div>
                          <label className="text-gray-500 block">
                            Pick-up location
                          </label>
                          <select
                            className="border p-2 rounded w-full text-[18px]"
                            value={pickupLocation}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPickupLocation(val);
                              dispatch(
                                setFilter({
                                  ...appliedFilterInfo,
                                  pickupLocation: serviceLocationNameInfo[val],
                                })
                              );
                            }}
                          >
                            {Object.keys(serviceLocationNameInfo)
                              .filter((name) => name !== dropoffLocation)
                              .map((name, idx) => (
                                <option key={idx} value={name}>
                                  {name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-gray-500 text-[12px] block">
                            Drop-off location
                          </label>
                          <select
                            className="border p-2 rounded w-full text-[18px]"
                            value={dropoffLocation}
                            onChange={(e) => {
                              const val = e.target.value;
                              setDropoffLocation(val);
                              dispatch(
                                setFilter({
                                  ...appliedFilterInfo,
                                  dropoffLocation: serviceLocationNameInfo[val],
                                })
                              );
                            }}
                          >
                            {Object.keys(serviceLocationNameInfo)
                              .filter((name) => name !== pickupLocation)
                              .map((name, idx) => (
                                <option key={idx} value={name}>
                                  {name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-500 text-[12px]">
                          Pick-up location
                        </p>
                        <p className="font-[18px]">{pickupLocation}</p>
                        <p className="text-gray-500 text-[12px] mt-2">
                          Drop-off location
                        </p>
                        <p className="font-[18px]">{dropoffLocation}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Dates & Time */}
              <div>
                <h2 className="font-bold text-[24px] mb-2">Dates & Time</h2>
                <div className="relative border rounded-lg p-4 bg-transparent">
                  <button
                    className="absolute top-4 right-4 text-black-700 font-semibold text-sm"
                    type="button"
                    onClick={() => setIsEditingDates(!isEditingDates)}
                  >
                    {isEditingDates ? "Save" : "Change"}
                  </button>
                  <div className="space-y-2">
                    {isEditingDates ? (
                      <>
                        <div>
                          <label className="text-gray-500 text-[12px] block">
                            Pick-up date & time
                          </label>
                          <input
                            type="datetime-local"
                            className="border p-2 rounded w-full text-[18px]"
                            value={pickupDateTime}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPickupDateTime(val);
                              dispatch(
                                setFilter({
                                  ...appliedFilterInfo,
                                  pickupDateTime: val,
                                })
                              );
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-gray-500 text-[12px] block">
                            Drop-off date & time
                          </label>
                          <input
                            type="datetime-local"
                            className="border p-2 rounded w-full text-[18px]"
                            value={dropoffDateTime}
                            onChange={(e) => {
                              const val = e.target.value;
                              setDropoffDateTime(val);
                              dispatch(
                                setFilter({
                                  ...appliedFilterInfo,
                                  dropoffDateTime: val,
                                })
                              );
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-500 text-sm">
                          Pick-up date & Time
                        </p>
                        <p className="font-medium">
                          {pickupDateTime.split("T").join(" | ")}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          Drop-off date & Time
                        </p>
                        <p className="font-medium">
                          {dropoffDateTime.split("T").join(" | ")}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <CarCartCard
              data={selectedCarInfo}
              handleConfirmFun={handleConfirm}
            />
          </div>

          {isUnavailable && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#fffaf4] border-2 border-red-600 text-gray-800 rounded-md shadow-lg px-6 py-4 max-w-sm w-full z-50">
              <h2 className="text-lg font-bold mb-2">Sorry,</h2>
              <p className="text-sm mb-2">
                It seems like someone has already reserved this car during the
                selected period.
              </p>
              <button
                className="text-sm bg-blue-600 text-white py-2 px-4 rounded"
                onClick={() => setIsUnavailable(false)}
              >
                Close
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default BookingModification;
