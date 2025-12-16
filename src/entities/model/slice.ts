import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ShoppingItem } from "../../entities/model/types";

interface ShoppingState {
  items: ShoppingItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ShoppingState = {
  items: [],
  isLoading: false,
  error: null,
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ShoppingItem>) {
      state.items = [action.payload, ...state.items];
    },
    toggleItemBought(state, action: PayloadAction<{ id: string }>) {
      const item = state.items.find((it) => it.id === action.payload.id);
      if (item) item.bought = !item.bought;
    },
    removeItemById(state, action: PayloadAction<{ id: string }>) {
      state.items = state.items.filter((it) => it.id !== action.payload.id);
    },
    replaceAllItems(state, action: PayloadAction<ShoppingItem[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearAllItems(state) {
      state.items = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  addItem,
  toggleItemBought,
  removeItemById,
  replaceAllItems,
  setLoading,
  setError,
  clearAllItems,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
