import { create } from "zustand";

type CountProps = {
  count: number;
  setCount: (count: number) => void;
  itemIds: string[];
  setItemIds: (itemIds: string[]) => void;
};
export const useStore = create<CountProps>()((set) => ({
  count: 0,
  setCount: (count: number) => set({ count }),
  itemIds: [],
  setItemIds: (itemIds: string[]) => set({ itemIds }),
}));