import { create } from "zustand";
import type { UserProfile, ColorProfile, Season } from "./types";
import { autoSeason } from "./logic";

interface State {
  profile: UserProfile | null;
  color: ColorProfile | null;
  season: Season;
  setProfile: (p: UserProfile) => void;
  setColor: (c: ColorProfile) => void;
  setSeason: (s: Season) => void;
  reset: () => void;
}

export const useDeterminant = create<State>((set) => ({
  profile: null,
  color: null,
  season: autoSeason(),
  setProfile: (profile) => set({ profile }),
  setColor: (color) => set({ color }),
  setSeason: (season) => set({ season }),
  reset: () => set({ profile: null, color: null, season: autoSeason() }),
}));
