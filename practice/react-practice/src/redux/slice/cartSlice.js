import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeCartItem: (state, action) =>{
      console.log("action?.payLoad", action)
      state.items = state.items?.filter(item => item?.id !== action?.payload)
    }
  },
});

export const { addToCart, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;