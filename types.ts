
export interface MonthData {
  id: number;
  name: string;
  year: number;
  days: number;
  startDay: number; // 0 for Sunday, 1 for Monday, etc.
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}
