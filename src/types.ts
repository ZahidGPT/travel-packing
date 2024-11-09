export interface TripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string[];
  climate: string;
}

export interface PackingItem {
  name: string;
  category: string;
  essential: boolean;
}