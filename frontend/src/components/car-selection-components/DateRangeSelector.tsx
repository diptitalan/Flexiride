import React, { useState } from "react";
import DatePicker from "./DatePicker";
import "../../styles/DateRangeSelector.css";

type SelectedDate = {
  pickupDate: Date | null;
  dropoffDate: Date | null;
  pickupTime: string | null;
  dropoffTime: string | null;
};

const DateRangeSelector: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dates, setDates] = useState<SelectedDate>({
    pickupDate: null,
    dropoffDate: null,
    pickupTime: null,
    dropoffTime: null,
  });

  const bookedDates = [
    "2025-04-10",
    "2025-04-09",
    "2025-05-08",
    "2025-05-10",
    "2025-04-12",
    "2025-04-13",
    "2025-05-06",
    "2025-05-03",
    "2025-05-24",
    "2025-04-23",
  ];

  // const formatDateTime = (date: Date | null, time: string | null): string => {
  //   if (!date || !time) return "";
  //   return `${date.toLocaleDateString()} ${time}`;
  // };
  const formatDateTime = (date: Date | null, time: string | null): string => {
    if (!date || !time) return "";
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" }); // "April"
    return `${day} ${month} ${time}`;
  };

  const handleDateChange = ({
    startDate,
    endDate,
    startTime,
    endTime,
  }: {
    startDate: string;
    endDate: string;
    startTime: string | null;
    endTime: string | null;
  }) => {
    const pickupDate = new Date(startDate);
    const dropoffDate = new Date(endDate);

    setDates({
      pickupDate,
      dropoffDate,
      pickupTime: startTime,
      dropoffTime: endTime,
    });

    setShowDatePicker(false); // Close the pick-up date picker after selection
  };

  return (
    <div id="Container"
      className="date-picker-buttons"
      onClick={() => {
        setShowDatePicker(true);
      }}
    >
      <div className="relative inline-block  inner-div ">
        <div className="date-picker-button ">
          {dates.pickupDate && dates.pickupTime
            ? formatDateTime(dates.pickupDate, dates.pickupTime)
            : new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
              })}
          <svg
            className="mt-1 mx-1"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.97007 5.49158C3.1107 5.35113 3.30132 5.27224 3.50007 5.27224C3.69882 5.27224 3.88945 5.35113 4.03007 5.49158L8.00007 9.46158L11.9701 5.49158C12.0387 5.41789 12.1215 5.35879 12.2135 5.3178C12.3055 5.2768 12.4048 5.25476 12.5056 5.25299C12.6063 5.25121 12.7063 5.26973 12.7997 5.30745C12.8931 5.34518 12.9779 5.40132 13.0491 5.47254C13.1203 5.54376 13.1765 5.62859 13.2142 5.72198C13.2519 5.81537 13.2704 5.9154 13.2687 6.0161C13.2669 6.1168 13.2448 6.21612 13.2039 6.30811C13.1629 6.40011 13.1038 6.48291 13.0301 6.55158L8.53007 11.0516C8.38945 11.192 8.19882 11.2709 8.00007 11.2709C7.80132 11.2709 7.6107 11.192 7.47007 11.0516L2.97007 6.55158C2.82962 6.41095 2.75073 6.22033 2.75073 6.02158C2.75073 5.82283 2.82962 5.6322 2.97007 5.49158Z"
              fill="black"
            />
          </svg>
        </div>
      </div>

      <div className="relative inline-block inner-div">
        <div className="date-picker-button">
          {dates.dropoffDate && dates.dropoffTime
            ? formatDateTime(dates.dropoffDate, dates.dropoffTime)
            : new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
              })}
          <svg
            className="mt-1 mx-1"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.97007 5.49158C3.1107 5.35113 3.30132 5.27224 3.50007 5.27224C3.69882 5.27224 3.88945 5.35113 4.03007 5.49158L8.00007 9.46158L11.9701 5.49158C12.0387 5.41789 12.1215 5.35879 12.2135 5.3178C12.3055 5.2768 12.4048 5.25476 12.5056 5.25299C12.6063 5.25121 12.7063 5.26973 12.7997 5.30745C12.8931 5.34518 12.9779 5.40132 13.0491 5.47254C13.1203 5.54376 13.1765 5.62859 13.2142 5.72198C13.2519 5.81537 13.2704 5.9154 13.2687 6.0161C13.2669 6.1168 13.2448 6.21612 13.2039 6.30811C13.1629 6.40011 13.1038 6.48291 13.0301 6.55158L8.53007 11.0516C8.38945 11.192 8.19882 11.2709 8.00007 11.2709C7.80132 11.2709 7.6107 11.192 7.47007 11.0516L2.97007 6.55158C2.82962 6.41095 2.75073 6.22033 2.75073 6.02158C2.75073 5.82283 2.82962 5.6322 2.97007 5.49158Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      {showDatePicker && (
        <DatePicker
          showMonths={2}
          showTime={true}
          disabledDates={bookedDates}
          onDateChange={handleDateChange}
          onClose={() => setShowDatePicker(false)}
          currentDateTime={dates}
        />
      )}
    </div>
  );
};

export default DateRangeSelector;
