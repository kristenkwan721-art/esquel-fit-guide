export type Gender = "male" | "female" | "neutral";
export type BodyShape = "rectangle" | "triangle" | "inverted" | "oval" | "hourglass";
export type FitType = "slim" | "regular" | "relaxed";
export type Season = "spring" | "summer" | "autumn" | "winter";
export type Undertone = "cool" | "warm" | "neutral";
export type Contrast = "low" | "medium" | "high";

export interface UserProfile {
  height: number; weight: number;
  chest: number; waist: number; hip: number;
  gender: Gender;
  bodyShape?: BodyShape;
}

export interface ColorProfile {
  undertone: Undertone;
  contrast: Contrast;
  seasonType: Season;
  palette: { name: string; hex: string }[];
}

export interface Recommendation {
  id: string;
  title: string;
  fitType: FitType;
  colors: { name: string; hex: string }[];
  items: string[];
  description: string;
  occasion: string;
}
