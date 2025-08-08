import { configureStore } from "@reduxjs/toolkit";
import formBuilderReducer from "./formBuilderSlice";
import formsReducer from "./formsSlice";

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    forms: formsReducer,
  },
});