import Header from "../components/header-component/Header";
import Footer from "../components/footer-component/Footer";
import DropDown from "../components/mainpage-components/filter-component/dropdown-component/Dropdown";
import PeriodDropdown from "../components/admin-dashboard-components/Calendar";
import Table from "../components/admin-dashboard-components/Table";
import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AdminDashboard = () => {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        downloadRef.current &&
        !downloadRef.current.contains(event.target as Node)
      ) {
        setShowDownloadOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const salesReportColumns = [
    "Period start",
    "Period end",
    "Location",
    "Car model",
    "Car ID",
    "Days of rent per car",
    "Reservations during period",
    "Mileage at the beginning (km)",
    "Mileage at the end (km)",
    "Total mileage (km)",
    "Average mileage",
    "Δ Avg KM/Res (%)",
    "Avg Feedback",
    "Min Feedback",
    "Δ Feedback (%)",
    "Revenue (₹)",
    "Δ Revenue (%)",
  ];

  const staffPerformanceColumns = [
    "CarRent agency",
    "Support Agent",
    "Support Agent Email",
    "Report Period Start",
    "Report Period End",
    "bookings processed by Support Agent",
    "Delta of reservation processed by Support Agent to previous period (in %).",
    "Average Feedback (1 to 5)",
    "Minimum Feedback (1 to 5)",
    "Delta of minimum Feedback for rental experience to previous period (in %)",
    "Revenue for reservations finished within reported period (EUR)",
    "Delta of revenue for reservations finished to previous period (in %)",
  ];

  const formatData = () => {
    return reportType === "Sales report"
      ? reportData.map((item) => ({
          "Period start": new Date(item.startDate).toLocaleDateString("de-DE"),
          "Period end": new Date(item.endDate).toLocaleDateString("de-DE"),
          Location: "Rome",
          "Car model": item.carModel,
          "Car ID": item.carID,
          "Days of rent per car": item.daysPerCar,
          "Reservations during period": item.resDuringPeriod,
          "Mileage at the beginning (km)": item.begMilage,
          "Mileage at the end (km)": item.endMilage,
          "Total mileage (km)": item.totalKilometers,
          "Average mileage": item.AvgMilage,
          "Δ Avg KM/Res (%)": item.deltaAvgMilage?.toFixed(2),
          "Avg Feedback": item.avgFeedback?.toFixed(2),
          "Min Feedback": item.miniFeedback?.toFixed(2),
          "Δ Feedback (%)": item.deltaAvgFeedback?.toFixed(2),
          "Revenue (₹)": item.revenue?.toFixed(2),
          "Δ Revenue (%)": item.deltaRevenue?.toFixed(2),
        }))
      : reportData.map((item) => ({
          "CarRent agency": "FlexiRide",
          "Support Agent": item.username,
          "Support Agent Email": item.email,
          "Report Period Start": startDate?.toLocaleDateString("de-DE"),
          "Report Period End": endDate?.toLocaleDateString("de-DE"),
          "bookings processed by Support Agent": item.bookingsHandled ?? "—",
          "Delta of reservation processed by Support Agent to previous period (in %).":
            item.deltaBookings?.toFixed(2),
          "Average Feedback (1 to 5)": item.avgFeedback?.toFixed(2),
          "Minimum Feedback (1 to 5)": item.miniFeedback?.toFixed(2),
          "Delta of minimum Feedback for rental experience to previous period (in %)":
            item.deltaMinFeedback?.toFixed(2),
          "Revenue for reservations finished within reported period (EUR)":
            item.revenue?.toFixed(2),
          "Delta of revenue for reservations finished to previous period (in %)":
            item.deltaRevenue?.toFixed(2),
        }));
  };

  const handleCreateReport = async () => {
    if (!reportType || !startDate || !endDate) {
      setError("Please select report type and date range.");
      return;
    }

    setLoading(true);
    setError(null);
    setReportData([]);

    try {
      const formattedStart = startDate.toISOString().split("T")[0];
      const formattedEnd = endDate.toISOString().split("T")[0];
      const encodedReportType = encodeURIComponent(reportType.toLowerCase());

      const response = await fetch(
        `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/reports?startDate=${formattedStart}&endDate=${formattedEnd}&reportType=${encodedReportType}`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch report.");
      }

      setReportData(data.data?.report || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const csv = Papa.unparse(formatData());
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${reportType.replace(" ", "_")}_report.csv`);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [reportType === "Sales report" ? salesReportColumns : staffPerformanceColumns],
      body: formatData().map((item) =>
        Object.values(item).map((val) => val ?? "")
      ),
      startY: 20,
    });
    doc.save(`${reportType.replace(" ", "_")}_report.pdf`);
  };

  const exportXLS = () => {
    const ws = XLSX.utils.json_to_sheet(formatData());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    const xlsData = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([xlsData], { type: "application/octet-stream" });
    saveAs(blob, `${reportType.replace(" ", "_")}_report.xlsx`);
  };

  const renderSalesRow = (item: any, idx: number) => (
    <tr key={idx} className="border-t border-gray-300">
      <td className="border border-gray-300 px-4 py-3">{new Date(item.startDate).toLocaleDateString("de-DE")}</td>
      <td className="border border-gray-300 px-4 py-3">{new Date(item.endDate).toLocaleDateString("de-DE")}</td>
      <td className="border border-gray-300 px-4 py-3">Rome</td>
      <td className="border border-gray-300 px-4 py-3">{item.carModel}</td>
      <td className="border border-gray-300 px-4 py-3">{item.carID}</td>
      <td className="border border-gray-300 px-4 py-3">{item.daysPerCar}</td>
      <td className="border border-gray-300 px-4 py-3">{item.resDuringPeriod}</td>
      <td className="border border-gray-300 px-4 py-3">{item.begMilage}</td>
      <td className="border border-gray-300 px-4 py-3">{item.endMilage}</td>
      <td className="border border-gray-300 px-4 py-3">{item.totalKilometers}</td>
      <td className="border border-gray-300 px-4 py-3">{item.AvgMilage}</td>
      <td className="border border-gray-300 px-4 py-3">{item.deltaAvgMilage?.toFixed(2)}%</td>
      <td className="border border-gray-300 px-4 py-3">{item.avgFeedback?.toFixed(2)}</td>
      <td className="border border-gray-300 px-4 py-3">{item.miniFeedback?.toFixed(2)}</td>
      <td className="border border-gray-300 px-4 py-3">{item.deltaAvgFeedback?.toFixed(2)}%</td>
      <td className="border border-gray-300 px-4 py-3">₹{item.revenue?.toFixed(2)}</td>
      <td className="border border-gray-300 px-4 py-3">{item.deltaRevenue?.toFixed(2)}%</td>
    </tr>
  );

  const renderStaffRow = (item: any, idx: number) => (
    <tr key={idx} className="border border-gray-300">
      <td className="border border-gray-300 px-4 py-3">FlexiRide</td>
      <td className="border border-gray-300 px-4 py-3">{item.username}</td>
      <td className="border border-gray-300 px-4 py-3">{item.email}</td>
      <td className="border border-gray-300 px-4 py-3">{startDate?.toLocaleDateString("de-DE")}</td>
      <td className="border border-gray-300 px-4 py-3">{endDate?.toLocaleDateString("de-DE")}</td>
      <td className="border border-gray-300 px-4 py-3">{item.bookingsHandled ?? "—"}</td>
      <td className="border border-gray-300 px-4 py-3">{item.deltaBookings?.toFixed(2)}%</td>
      <td className="border border-gray-300 px-4 py-3">{item.avgFeedback?.toFixed(2)}</td>
      <td className="border border-gray-300 px-4 py-3">{item.miniFeedback?.toFixed(2)}</td>
      <td className="border border-gray-300 px-4 py-3">{item.deltaMinFeedback?.toFixed(2)}%</td>
      <td className="border border-gray-300 px-4 py-3">€{item.revenue?.toFixed(2)}</td>
      <td className="border border-gray-300 px-4 py-3">{item.deltaRevenue?.toFixed(2)}%</td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-[#fffbf3] flex flex-col font-sans">
      <Header />
      <main className="flex-1 px-4 md:px-8 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>

          {reportData.length > 0 && (
            <div className="relative" ref={downloadRef}>
              <button
                onClick={() => setShowDownloadOptions((prev) => !prev)}
                className="px-4 py-2 border border-gray-400 rounded-md text-sm text-gray-800 bg-transparent hover:bg-gray-100"
              >
                Download ▼
              </button>
              {showDownloadOptions && (
                <div className="absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white/90 backdrop-blur-md ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <button onClick={exportCSV} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      Export CSV
                    </button>
                    <button onClick={exportPDF} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      Export PDF
                    </button>
                    <button onClick={exportXLS} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      Export XLS
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <DropDown
            options={["Staff performance", "Sales report"]}
            value={reportType}
            onChange={setReportType}
            label="Report Type"
            inlineLabelOnly={true}
          />

          <PeriodDropdown
            onPeriodChange={({ start, end }) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />

          <DropDown
            options={["Rome"]}
            value={location}
            onChange={setLocation}
            label="Location"
            inlineLabelOnly={true}
          />

          <div className="ml-auto">
            <button
              onClick={handleCreateReport}
              className="bg-[#cc0000] text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? "Generating..." : "Create report"}
            </button>
          </div>
        </div>

        {error && <div className="text-red-600 mb-4 text-center font-medium">{error}</div>}

        {reportData.length > 0 && (
          <Table
            columns={
              reportType === "Staff performance"
                ? staffPerformanceColumns
                : salesReportColumns
            }
            data={reportData}
            renderRow={
              reportType === "Staff performance"
                ? renderStaffRow
                : renderSalesRow
            }
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
