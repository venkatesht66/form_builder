import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const loadForms = () => {
  const data = localStorage.getItem("myForms");
  return data ? JSON.parse(data) : [];
};

const saveForms = (forms) => {
  localStorage.setItem("myForms", JSON.stringify(forms));
};

const initialState = loadForms();

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    saveForm(state, action) {
      const newForm = {
        id: uuid(),
        name: action.payload.name,
        createdAt: new Date().toISOString(),
        schema: { fields: action.payload.fields },
      };
      state.push(newForm);
      saveForms(state);
    },
    deleteForm(state, action) {
      const filtered = state.filter(f => f.id !== action.payload);
      saveForms(filtered);
      return filtered;
    },
  },
});

export const { saveForm, deleteForm } = formsSlice.actions;
export default formsSlice.reducer;