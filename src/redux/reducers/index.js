import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
//   count: 0,
};

export const cartSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    add(state, action) {
      const newItems = action.payload;
      const checkItem = state.value.find((item) => item.id === newItems.id);
      if (checkItem) {
        alert(
          "Kamu sudah memasukkan produk ini di keranjang"
        );
      } else {
        // state.count += 1;
        state.value.push({ ...action.payload, quantity: 1 });
      }
    },
    increment: (state, action) => {
      const item = state.value.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrement: (state, action) => {
      const item = state.value.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    remove(state, action) {
      const itemRemove = action.payload;
      state.value = state.value.filter((item) => item.id !== itemRemove);
      // state.countCart -= 1;
    },
  },
});

export const { add, remove, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
