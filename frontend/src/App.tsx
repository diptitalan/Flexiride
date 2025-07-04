import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { createBrowserRouter, Outlet } from "react-router";
import AppLayout from "./layout/AppLayout";
import CarsPage from "./pages/CarsPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import BookCarPage from "./pages/BookCarPage";
import BookingModifications from "./pages/BookingModifications";
import NotFoundPage from "./pages/PageNotFound";
import EditProfile from "./pages/EditProfile";
import AdminDashBoard from "./pages/AdminDashBoard";
import SupportBookings from "./pages/SupportBookings";
import { bookings } from "./store/slices/BookingData";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cars",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <CarsPage />,
          },
          {
            path: "booking-car",
            element: <BookCarPage />,
          },
        ],
      },
      {
        path: "my-profile",
        element: <EditProfile />,
      },
      { path: "bookings", element: <SupportBookings/> },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminDashBoard />,
  },
  {
    path: "/mybookings",
    element: <MyBookingsPage />, // remove before production
  },
  {
    path: "/modify-booking/:bookingId",
    element: <BookingModifications />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
