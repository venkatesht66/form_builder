import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = { fields: [] };

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addField(state, action) {
      state.fields.push({
        id: uuid(),
        type: action.payload.type,
        label: "Untitled",
        defaultValue: "",
        validations: {},
        options: [],
      });
    },
    updateField(state, action) {
      const idx = state.fields.findIndex(f => f.id === action.payload.id);
      if (idx >= 0) state.fields[idx] = action.payload;
    },
    removeField(state, action) {
      state.fields = state.fields.filter(f => f.id !== action.payload);
    },
    setFields(state, action) {
      state.fields = action.payload;
    },
    resetForm() {
      return initialState;
    },
  },
});

export const { addField, updateField, removeField, setFields, resetForm } =
  formBuilderSlice.actions;
export default formBuilderSlice.reducer;