import { create } from "zustand";

interface ProductStoreState {
  searchTerm: string;
  sortOption: "none" | "low-to-high" | "high-to-low";
  setSearchTerm: (term: string) => void;
  setSortOption: (option: "none" | "low-to-high" | "high-to-low") => void;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  searchTerm: "",
  sortOption: "none",
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSortOption: (option) => set({ sortOption: option }),
}));
