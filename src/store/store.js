import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage"; // Default: localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Persist config
const persistConfig = {
  key: "root", // Root key for storage
  storage,
};

// Combine reducers (if you plan to add more in the future)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents non-serializable warning
    }),
});

// Persistor
export const persistor = persistStore(store);

export default store;

