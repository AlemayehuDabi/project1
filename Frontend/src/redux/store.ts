import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "./slices/categorySlice";
import authSlice from "./Slice/authSlice";
import eventSlice from "./Slice/eventSlice";
import paymentSlice from "./Slice/paymentSlice";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
// import searchReducer from "./slices/searchSlice";

// Combine reducers first
const rootReducer = combineReducers({
  //   categories: categoryReducer,
  auth: persistReducer(
    {
      key: "auth",
      storage,
    },
    authSlice
  ),
  //   search: searchReducer,
  event: eventSlice,
  payment: paymentSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
