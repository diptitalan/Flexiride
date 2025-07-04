import user1 from "../assets/images/user-profile-feedback-1.png";
import user2 from "../assets/images/user-profile-feedback-2.png";
import user3 from "../assets/images/user-profile-feedback-3.png";

export type CarFeedback = {
  author: string;
  authorImageUrl: string;
  date: string;
  rentalExperience:number;
  text: string;
}

export const staticCarFeedbacks:CarFeedback[] = [
  {
    author: "Sarah L.",
    authorImageUrl: user1,
    rentalExperience: 4,
    date: "01.11.2024",
    text:
      "Fantastic service from start to finish! The booking process was smooth, and the staff was incredibly helpful in answering all my questions. The car was clean, in great condition, and made my trip so much more enjoyable. Highly recommend!",
  },
  {
    author: "Ahmed K.",
   authorImageUrl: user2,
    rentalExperience: 3,
    date: "28.10.2024",
    text:
      "The car rental process was seamless, and the car was practically brand new. I loved the variety of vehicles available, and the flexibility with pick-up and drop-off locations made my business trip so much easier. Thank you for the exceptional service!",
  },
  {
    author: "David P.",
   authorImageUrl: user3,
    rentalExperience: 4,
    date: "14.10.2024",
    text:
      "The best car rental experience I've had. Quick and easy booking, excellent customer service, and a well-maintained vehicle. Made my travel in Italy stress-free. I'll definitely be using them for future trips!",
  },
  {
    author: "John D",
   authorImageUrl: user3,
    rentalExperience: 3,
    date: "15.10.2024",
    text:
      "Quick and easy booking, excellent customer service, and a well-maintained vehicle. Made my travel in Italy stress-free. I'll definitely be using them for future trips!",
  },
];
