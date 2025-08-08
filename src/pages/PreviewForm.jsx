import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, TextField, Typography, Button } from "@mui/material";
import { computeDerivedValue } from "../utils/derivedFields";
import { validateField } from "../utils/validations";
import { useParams } from "react-router-dom";

export default function PreviewForm() {
  const { id } = useParams();
  const savedForms = useSelector(s => s.forms);
  const currentBuilder = useSelector(s => s.formBuilder.fields);
  const [schema, setSchema] = useState({ fields: [] });
  useEffect(() => {
    if (id) {
      const found = savedForms.find(f => f.id === id);
      if (found) setSchema(found.schema);
    } else {
      setSchema({ fields: currentBuilder });
    }
  }, [id, savedForms, currentBuilder]);

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // recompute derived fields when parent changes
    schema.fields.forEach(field => {
      if (field.isDerived && field.formula && Array.isArray(field.parentFields)) {
        const parentValues = {};
        field.parentFields.forEach(pid => {
          parentValues[pid] = values[pid];
        });
        const val = computeDerivedValue(field.formula, parentValues);
        setValues(prev => ({ ...prev, [field.id]: val }));
      }
    });
  }, [values, schema.fields]);

  const handleChange = (id, v) => {
    setValues(prev => ({ ...prev, [id]: v }));

    const field = schema.fields.find(f => f.id === id);
    if (field) {
      const err = validateField(v, field.validations);
      setErrors(prev => ({ ...prev, [id]: err }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    schema.fields.forEach(f => {
      const err = validateField(values[f.id], f.validations);
      if (err) newErrors[f.id] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Form is valid (submission simulated).");
    }
  };

  if (!schema.fields) return <div>No form selected</div>;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5">Preview</Typography>
      {schema.fields.map(field => (
        <Box key={field.id} sx={{ mt: 2 }}>
          {field.type === "text" && (
            <TextField
              label={field.label}
              value={values[field.id] ?? field.defaultValue ?? ""}
              onChange={e => handleChange(field.id, e.target.value)}
              helperText={errors[field.id] || ""}
              error={!!errors[field.id]}
              fullWidth
            />
          )}
          {field.type === "number" && (
            <TextField
              type="number"
              label={field.label}
              value={values[field.id] ?? field.defaultValue ?? ""}
              onChange={e => handleChange(field.id, e.target.value)}
              helperText={errors[field.id] || ""}
              error={!!errors[field.id]}
              fullWidth
            />
          )}
          {field.type === "date" && (
            <TextField
              type="date"
              label={field.label}
              value={values[field.id] ?? field.defaultValue ?? ""}
              onChange={e => handleChange(field.id, e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Box>
      ))}

      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained">Submit</Button>
      </Box>
    </Box>
  );
}