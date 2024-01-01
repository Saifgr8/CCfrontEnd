import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "userPaymentSlice",
  initialState: {
    paymentCartList: [],
  },
  reducers: {
    allCartItems: (state, action) => {
      const newItem = action.payload;

      newItem.forEach((item) => {
        if (item && item.name) {
          const existingItemIndex = state.paymentCartList.findIndex(
            (olditem) => olditem.name === item.name
          );
          if (existingItemIndex !== -1) {
            state.paymentCartList[existingItemIndex].quantity += 1;
          } else {
            state.paymentCartList.push({ ...item });
          }
        } else {
          console.error("Invalid newItem:", item);
        }
      });
    },
    displayInitialItems: (state, action) => {
      const newCartItems = action.payload;
      state.paymentCartList = newCartItems;
    },
    clearAllPaymentCarts: (state, action) => {
      state.paymentCartList = [];
    },
    handleIncrementPayment: (state, action) => {
      const newItem = action.payload;
      const item = state.paymentCartList.find(
        (item) => item.name === newItem.name
      );
      if (item) {
        item.quantity += 1;
      }
    },
    handleDecrementPayment: (state, action) => {
      const newItem = action.payload;
      const item = state.paymentCartList.find(
        (item) => item.name === newItem.name
      );
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          state.paymentCartList = state.paymentCartList.filter(
            (item) => item.name !== newItem.name
          );
        }
      }
    },
  },
});
export const {
  allCartItems,
  clearAllPaymentCarts,
  handleIncrementPayment,
  handleDecrementPayment,
  displayInitialItems,
} = paymentSlice.actions;
export default paymentSlice.reducer;
