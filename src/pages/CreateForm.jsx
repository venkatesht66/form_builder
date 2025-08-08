import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField, updateField, removeField, setFields } from "../store/formBuilderSlice";
import { Button, Box, Typography } from "@mui/material";
import FieldList from "../components/FieldList";

export default function CreateForm() {
  const dispatch = useDispatch();
  const fields = useSelector(s => s.formBuilder.fields);

  return (
    <Box>
      <Typography variant="h5">Form Builder</Typography>

      <Box>
        <Button onClick={() => dispatch(addField({ type: "text" }))}>Add Text</Button>
        <Button onClick={() => dispatch(addField({ type: "number" }))}>Add Number</Button>
        <Button onClick={() => dispatch(addField({ type: "textarea" }))}>Add Textarea</Button>
        <Button onClick={() => dispatch(addField({ type: "select" }))}>Add Select</Button>
        <Button onClick={() => dispatch(addField({ type: "radio" }))}>Add Radio</Button>
        <Button onClick={() => dispatch(addField({ type: "checkbox" }))}>Add Checkbox</Button>
        <Button onClick={() => dispatch(addField({ type: "date" }))}>Add Date</Button>
      </Box>

      <FieldList fields={fields} onRemove={(id) => dispatch(removeField(id))} onUpdate={(f) => dispatch(updateField(f))} />

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={() => {
          const name = prompt("Form name?");
          if (!name) return;
          dispatch({ type: "forms/saveForm", payload: { name, fields } });
          alert("Saved to My Forms");
          dispatch(setFields([]));
        }}>Save Form</Button>
      </Box>
    </Box>
  );
}