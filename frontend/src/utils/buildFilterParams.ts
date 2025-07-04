import FilterInfo from "../types/FilterInfo";

export const buildFilterParams = (filters: FilterInfo): Record<string, string> => {
  const params: Record<string, string> = {};
  if (filters.pickupLocation) {
    params.pickupLocationId = filters.pickupLocation;
  }
  if (filters.dropoffLocation) {
    params.dropOffLocationId = filters.dropoffLocation;
  }
  if (filters.pickupDateTime) {
    params.pickupDateTime = filters.pickupDateTime;
  }
  if (filters.dropoffDateTime) {
    params.dropOffDateTime = filters.dropoffDateTime;
  }
  if (filters.category) {
    params.category = filters.category;
  }
  if (filters.gearBoxType) {
    params.gearBoxType = filters.gearBoxType;
  }
  if (filters.engineType) {
    params.fuelType = filters.engineType;
  }
  params.minPrice = filters.minPrice.toString();
  params.maxPrice = filters.maxPrice.toString();
  return params;
};
