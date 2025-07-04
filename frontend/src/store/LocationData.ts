// LocationData.ts
export interface Location {
    locationId: string;
    locationName: string;
    locationAddress: string;
    locationImageUrl:string;
  }
  const url = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.204964970961!2d30.518079376509487!3d50.45099727159079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce56407c1ed9%3A0x48db6a472b1109c3!2sHyatt%20Regency%20Kyiv!5e0!3m2!1sen!2sua!4v1680472615006!5m2!1sen!2sua";
  export const locations: Location[] = [
    { locationId: "1", locationName: "Kyiv Hayatt Hotel", locationAddress: "5, Ally Tarasovoyi st", locationImageUrl:url},
    { locationId: "2", locationName: "Kyiv Hayatt Hotel", locationAddress: "5, Ally Tarasovoyi st",locationImageUrl:url },
    { locationId: "3", locationName: "Kyiv Hayatt Hotel", locationAddress: "5, Ally Tarasovoyi st",locationImageUrl:url },
    { locationId: "4", locationName: "Kyiv Hayatt Hotel", locationAddress: "5, Ally Tarasovoyi st" ,locationImageUrl:url},
    { locationId: "5", locationName: "Kyiv Hayatt Hotel", locationAddress: "5, Ally Tarasovoyi st",locationImageUrl:url },
    { locationId: "6", locationName: "Kyiv Hayatt Hotel", locationAddress: "5, Ally Tarasovoyi st",locationImageUrl:url },
    { locationId: "7", locationName: "Kyiv Hayatt Hotel", locationAddress: "5, Ally Tarasovoyi st",locationImageUrl:url },
    { locationId: "8", locationName: "Kyiv Hayatt Hotel", locationAddress: "5, Ally Tarasovoyi st",locationImageUrl:url },
    { locationId: "9", locationName: "Kyiv Hayatt Hotel", locationAddress: "5, Ally Tarasovoyi st",locationImageUrl:url },
  ];