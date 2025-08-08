import React from "react";
import { Box, Paper, IconButton, TextField, Checkbox, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FieldList({ fields = [], onRemove, onUpdate }) {
  if (!fields.length) return <div>No fields yet</div>;

  return (
    <Box sx={{ mt: 2 }}>
      {fields.map(f => (
        <Paper key={f.id} sx={{ p: 2, mb: 1 }}>
          <TextField
            label="Label"
            value={f.label}
            onChange={e => onUpdate({ ...f, label: e.target.value })}
            sx={{ mr: 2 }}
          />
          <Checkbox
            checked={!!f.validations?.required}
            onChange={e => onUpdate({ ...f, validations: { ...f.validations, required: e.target.checked } })}
          /> Required
          <IconButton onClick={() => onRemove(f.id)}><DeleteIcon /></IconButton>
        </Paper>
      ))}
    </Box>
  );
}