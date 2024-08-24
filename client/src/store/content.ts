import { create } from "zustand";

// Define the types for the state and actions
interface ContentState {
  contentType: string;
  setContentType: (type: string) => any;
}

// Create the content store with proper types
export const useContentStore = create<ContentState>((set) => ({
  contentType: "tv",
  setContentType: (type: string) => set({ contentType: type }),
}));
