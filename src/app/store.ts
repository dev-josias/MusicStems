import { configureStore } from "@reduxjs/toolkit";
import queueReducer from "@/features/queue/queueSlice";
import storageReducer from "@/features/storage/storageSlice";

export const store = configureStore({
  reducer: {
    queue: queueReducer,
    storage: storageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
