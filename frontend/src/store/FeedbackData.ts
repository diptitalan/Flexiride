import car1 from '../assets/images/car1.jpg';
import car2 from '../assets/images/car2.jpg';
import car3 from '../assets/images/car3.jpg';
export interface FeedbackData {
    feedbackId: number;
    author: string;
    location: string;
    date: string;
    orderHistory: string;
    carModel: string;
    carImageUrl: string;
    rating: number;
    feedbackText: string;
  }
  
  export const feedbacks: FeedbackData[] = [
    {
      feedbackId: 1,
      author: "Sarah L.",
      location: "New York, USA",
      date: "05.10.2024",
      orderHistory: "#2437 (06.11.24)",
      carModel: "Mercedes-Benz A class 2019",
      carImageUrl: car1,
      rating: 4,
      feedbackText: "Fantastic service from start to finish! The booking process was smooth, and the staff was incredibly helpful...",
    },
    {
      feedbackId: 2,
      author: "Sarah L.",
      location: "New York, USA",
      date: "05.10.2024",
      orderHistory: "#2437 (06.11.24)",
      carModel: "Porsche 911 2021",
     carImageUrl: car2,
      rating: 4,
      feedbackText: "",
    },
    {
      feedbackId: 3,
      author: "Sarah L.",
      location: "New York, USA",
      date: "05.10.2024",
      orderHistory: "#2437 (06.11.24)",
      carModel: "Nissan Z 2024",
     carImageUrl: car3,
      rating: 4,
      feedbackText: "Fantastic service from start to finish!",
    },
    {
        feedbackId: 4,
        author: "Michael D.",
        location: "Los Angeles, USA",
        date: "04.15.2024",
        orderHistory: "#2438 (06.11.24)",
        carModel: "Toyota Supra 2022",
       carImageUrl: car1,
        rating: 5,
        feedbackText: "Loved the Supra. Fast and clean. Would rent again!",
      },
      {
        feedbackId: 5,
        author: "Anna R.",
        location: "Chicago, USA",
        date: "03.20.2024",
        orderHistory: "#2439 (06.11.24)",
        carModel: "Audi A4 2023",
       carImageUrl: car2,
        rating: 3,
        feedbackText: "Decent experience but had some delays at pickup.",
      },
      {
        feedbackId: 6,
        author: "John K.",
        location: "Miami, USA",
        date: "02.11.2024",
        orderHistory: "#2440 (06.11.24)",
        carModel: "BMW X5 2020",
       carImageUrl: car3,
        rating: 5,
        feedbackText: "Best rental experience I’ve had so far.",
      },
      {
        feedbackId: 7,
        author: "Emily T.",
        location: "Dallas, USA",
        date: "01.30.2024",
        orderHistory: "#2441 (06.11.24)",
        carModel: "Tesla Model 3 2021",
       carImageUrl: car1,
        rating: 5,
        feedbackText: "The electric drive was a dream!",
      },
      {
        feedbackId: 8,
        author: "Raj P.",
        location: "Seattle, USA",
        date: "01.10.2024",
        orderHistory: "#2442 (06.11.24)",
        carModel: "Hyundai Sonata 2022",
       carImageUrl: car2,
        rating: 4,
        feedbackText: "Great value for the price.",
      },
      {
        feedbackId: 9,
        author: "Laura G.",
        location: "Austin, USA",
        date: "12.25.2023",
        orderHistory: "#2443 (06.11.24)",
        carModel: "Chevrolet Camaro 2021",
       carImageUrl: car3,
        rating: 5,
        feedbackText: "Fun and sporty! Loved every minute of it.",
      },
    
  ];
  