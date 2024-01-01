import { configureStore } from "@reduxjs/toolkit";
import userDataReducer, { saveToLocalStorage } from "./userDataSlice";
import paymentSlice from "./userPaymentSlice";

const store = configureStore({
  reducer: {
    userData: userDataReducer,
    userPayment: paymentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage),
});

export default store;
