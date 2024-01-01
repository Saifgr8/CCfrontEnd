import { createSlice } from "@reduxjs/toolkit";

const storedData = JSON.parse(localStorage.getItem("reduxState"));

const initialState = storedData?.userData || {
  cartItems: [],
  cartItemCounter: 0,
};

const userDataSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    incrementCartItemCounter: (state) => {
      state.cartItemCounter += 1;
    },
    cartItemsList: (state, action) => {
      const newItems = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      console.log(newItems);

      newItems.forEach((newItem) => {
        if (newItem && newItem.name) {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.name === newItem.name
          );

          if (existingItemIndex !== -1) {
            // If the item exists, update its quantity
            state.cartItems[existingItemIndex].quantity += 1;
          } else {
            // If the item doesn't exist, add it to the array
            state.cartItems.push({ ...newItem, quantity: newItem.quantity || 1 });
          }
        } else {
          console.error("Invalid newItem:", newItem);
        }
      });
    },
    clearUserData: (state) => {
      state.cartItemCounter = 0;
      state.cartItems = [];
    },
    handleIncrement: (state, action) => {
      const newItem = action.payload;
      const item = state.cartItems.find((item) => item.name === newItem.name);
      if (item) {
        item.quantity += 1;
      }
    },
    handleDecrement: (state, action) => {
      const newItem = action.payload;
      const item = state.cartItems.find((item) => item.name === newItem.name);
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          // Remove the item from the array if its quantity becomes 0
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.name !== newItem.name
          );
        }
      }
    },
  },
});

export const {
  incrementCartItemCounter,
  cartItemsList,
  clearUserData,
  handleIncrement,
  handleDecrement,
} = userDataSlice.actions;

// Save to local storage middleware
export const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  return result;
};

export default userDataSlice.reducer;
