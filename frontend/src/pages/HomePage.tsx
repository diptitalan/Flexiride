import React, { useEffect, useState } from "react";
import axios from "axios";
import CarSelector from "../components/mainpage-components/filter-component/CarSelector";
import About from "../components/mainpage-components/about-us-component/About";
import { AboutDataItem, staticAboutData } from "../store/AboutData";
import Heading from "../components/Heading-component/Heading";
import LocationSection from "../components/mainpage-components/location-component/LocationSection";
import Feedback from "../components/mainpage-components/feedback-component/Feedback";
import FAQ from "../components/mainpage-components/faq-component/FAQ";
import { faqList as staticFaqList, FAQ as FAQType } from "../store/FAQList";
import { Location, locations } from "../store/LocationData";
import { CarsDataType, staticCarsData } from "../store/CarsData";
import PopularCars from "../components/mainpage-components/popular-car-component/PopularCar";
import { useDispatch } from "react-redux";
import { setServiceLocationInfo } from "../store/slices/serviceLocationSlice";
import { feedbacks, FeedbackData } from "../store/FeedbackData";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [aboutData, setAboutData] = useState<AboutDataItem[]>([]);
  const [faqData, setFaqData] = useState<FAQType[]>(staticFaqList);
  const [locationData, setLocationData] = useState<Location[]>(locations);
  const [popularCarData, setPopularCarData] =
    useState<CarsDataType[]>(staticCarsData);
  const [recentFeedbacks, setRecentFeedbacks] =
    useState<FeedbackData[]>(feedbacks);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const AboutUsResponse = await axios.get<{
          data: { content: AboutDataItem[] };
        }>(
          "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/home/about-us"
        );
        setAboutData(AboutUsResponse.data.data.content);
      } catch (err: any) {
        setAboutData(staticAboutData);
        console.error("Error fetching About Us data:", err);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const FaqResponse = await axios.get<{
          data: { content: FAQType[] };
        }>(
          "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/home/faq"
        );
        setFaqData(FaqResponse.data.data.content);
      } catch (err: any) {
        setFaqData(staticFaqList);
        console.error("Error fetching Faq data:", err);
      }
    };

    fetchFaqData();
  }, []);

  // useEffect(() => {
  //   const fetchLocationData = async () => {
  //     try {
  //       const locationResponse = await axios.get<{
  //         data: { content: Location[] };
  //       }>(
  //         'https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/home/locations'
  //       );
  //       setLocationData(locationResponse.data.data.content);
  //       dispatch(setServiceLocationInfo(locationResponse.data.data.content.map((loc: any) => ({
  //         locationName: loc.locationName,
  //         locationId: loc.locationId,
  //       }))));
  //     } catch (err: any) {
  //       setLocationData(locations);
  //       dispatch(setServiceLocationInfo(locations.map((loc: any) => ({
  //         locationName: loc.locationName,
  //         locationId: loc.locationId,
  //       }))));
  //       console.error('Error fetching About Us data:', err);
  //     }
  //   }
  //   fetchLocationData();
  // },[])

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const locationResponse = await axios.get<{
          data: { content: Location[] };
        }>(
          "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/home/locations"
        );
        const fetchedLocations = locationResponse.data.data.content;
        setLocationData(fetchedLocations);

        dispatch(
          setServiceLocationInfo(
            fetchedLocations.map((loc) => ({
              locationName: loc.locationName,
              locationId: loc.locationId,
            }))
          )
        );
      } catch (err: any) {
        setLocationData(locations);
        dispatch(
          setServiceLocationInfo(
            locations.map((loc) => ({
              locationName: loc.locationName,
              locationId: loc.locationId,
            }))
          )
        );
        console.error("Error fetching Location data:", err);
      }
    };

    fetchLocationData();
  }, []);

  useEffect(() => {
    const fetchPopularCars = async () => {
      try {
        const popularCarResponse = await axios.get<{
          data: { content: CarsDataType[] };
        }>(
          "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/cars/popular"
        );
        setPopularCarData(popularCarResponse.data.data.content);
      } catch (err: any) {
        setPopularCarData(staticCarsData);
        console.error("Error fetching PopularCar data:", err);
      }
    };
    fetchPopularCars();
  }, []);
  useEffect(() => {
    const fetchRecentFeedbacksData = async () => {
      try {
        const recentFeedbacksResponse = await axios.get<{
          data: { content: FeedbackData[] };
        }>(
          "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/feedbacks/recent"
        );
        setRecentFeedbacks(recentFeedbacksResponse.data.data.content);
      } catch (err: any) {
        setRecentFeedbacks(feedbacks);
        console.error("Error fetching Recent Feedback data:", err);
      }
    };
    fetchRecentFeedbacksData();
  }, []);
  return (
    <>
      <div className="px-4 py-8 bg-[#fffbf3] font-sans">
        <Heading title="Choose a car for rental" />
      </div>
      <CarSelector />
      {/* <CarsView /> */}
      <PopularCars data={popularCarData} />
      <About data={aboutData} />
      <LocationSection locations={locationData} />
      <Feedback data={recentFeedbacks} />
      <FAQ faqList={faqData} />
    </>
  );
};

export default HomePage;
