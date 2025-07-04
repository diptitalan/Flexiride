export type BookingInfo = {
  bookingId: string;
  bookingStatus: string;
  carImageUrl: string;
  carModel: string;
  carId:string;
  orderDetails: string;
  feedback?: {
    rating: number;
    comment: string;
  };
};
