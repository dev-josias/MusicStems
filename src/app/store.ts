import { combineReducers, configureStore } from "@reduxjs/toolkit";
import queueReducer from "@/features/queue/queueSlice";
import storageReducer from "@/features/storage/storageSlice";
import tasksReducer from "@/features/tasks/tasksSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["tasks"],
  blacklist: ["queue", "storage"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    queue: queueReducer,
    storage: storageReducer,
    tasks: tasksReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
