export interface ValidationError {
  message: string;
  errors: Record<string, string>;
}

export interface RadioOption {
  value: string;
  label: string;
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntryBase {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
}

export interface DiaryEntry extends DiaryEntryBase {
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
