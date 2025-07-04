export type SelectedCarType = {
    carId: string | number;
    carRating: number;
    climateControlOption: string;
    engineCapacity: string;
    fuelConsumption: string;
    fuelType: 'DIESEL' | 'PETROL' | 'ELECTRIC' | string;
    gearBoxType: 'MANUAL' | 'AUTOMATIC' | string;
    images: string[];
    location: string;
    model: string;
    passengerCapacity: number | string;
    pricePerDay: number | string;
    serviceRating: number;
    status: 'AVAILABLE' | 'RENTED' | 'UNAVAILABLE' | string;
};
  
export const staticSelectedCar = {
    carId: "6805242d29936d116649aff4",
    carRating: 4.9,
    climateControlOption: "CLIMATE_CONTROL",
    engineCapacity: "3.0",
    fuelConsumption: "7.6 Liter/100km",
    fuelType: "DIESEL",
    gearBoxType: "MANUAL",
    images: ["carimage.pngmercedes-benz-e-class.jpg"],
    location: "Khreshchatyk Street",
    model: "Mercedes-Benz E-Class 2024 (4)",
    passengerCapacity: "5",
    pricePerDay: "177.76",
    serviceRating: 5,
    status: "AVAILABLE"
  };
  