// utils/api.ts
export const fetchReport = async (
  startDate: string,  // startDate should be a string (formatted date)
  endDate: string,    // endDate should be a string (formatted date)
  reportType: string  // reportType should be a string (the selected report type)
): Promise<any> => {  // You can specify a more precise type instead of `any`
  const endpoint = `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/reports`;
  const response = await fetch(
    `${endpoint}?start=${startDate}&end=${endDate}&reportType=${reportType}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch report');
  }

  return response.json(); // assuming the response is a JSON array with the report data
};
