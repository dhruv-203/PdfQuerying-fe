import { configureStore } from "@reduxjs/toolkit";
import { api } from "./Api";
import { authReducer } from "./auth.slice";
import { chatReducer } from "./chat.slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export { store };
