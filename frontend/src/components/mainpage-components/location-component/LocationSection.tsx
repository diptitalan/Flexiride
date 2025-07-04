import React,{useState} from "react";
import {Location} from "../../../store/LocationData"
// import  locations  from "../../../store/LocationData";
interface LocationSectionProps {
  locations: Location[];
}
const LocationSection: React.FC<LocationSectionProps > = ({locations}) => {
  const [activeId,setActiveId] = useState<string|number>(2);
  const [locationUrl,setLocationUrl] = useState<string>("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.0784106779065!2d78.37883712236294!3d17.4334638936225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e152224b79%3A0xf4ab3bded078553b!2sEPAM!5e0!3m2!1sen!2sin!4v1745406665944!5m2!1sen!2sin");

  return (
    <section className="w-full bg-[#fffbf3] py-30 px-4 sm:px-6 md:px-8 font-sans h-[630px] ">
      
        {/* Title centered above both columns */}
        <h2 className="text-lg sm:text-xl text-gray-600 mb-6 font-semibold text-left">
          (OUR LOCATIONS)
        </h2>

        {/* Content Row */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 h-[calc(630px-70px)]">
          {/* Location List */}
          <div className="lg:w-1/3 h-full overflow-y-auto pr-1 space-y-3">
            {locations.map((data) => (
              <div onClick={() => {setActiveId(data.locationId);setLocationUrl(data.locationImageUrl)}}
                key={data.locationId}
                className={`p-3 rounded-md transition cursor-pointer ${
                  data.locationId === activeId
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 border-b border-gray-200"
                }`}
              >
                <p className="font-semibold text-base">{data.locationName}</p>
                <p className="text-sm">{data.locationAddress}</p>
              </div>
            ))}
          </div>

          {/* Google Map */}
          <div className="lg:w-2/3 h-full">
            <iframe
              title="Kyiv Map"
              className="w-full h-full rounded-md"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
              src={locationUrl}
            ></iframe>
          </div>
        </div>
      
    </section>
  );
};

export default LocationSection;
