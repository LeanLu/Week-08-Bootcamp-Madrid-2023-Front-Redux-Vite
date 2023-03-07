import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
  // Propiedad obligatoria del configureStore:
  reducer: {},
});
