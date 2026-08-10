import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchProducts: (state, action) => {
            state.items = state.items?.payload
        }
    }
})

export const {fetchProducts} = productSlice?.actions;

export default productSlice?.reducer;