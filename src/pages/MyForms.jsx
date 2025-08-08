import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteForm } from "../store/formsSlice";
import { useNavigate } from "react-router-dom";

export default function MyForms() {
  const forms = useSelector(s => s.forms);
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <>
      <Typography variant="h5">My Forms</Typography>
      <List>
        {forms.map(f => (
          <ListItem key={f.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteForm(f.id))}>
              <DeleteIcon />
            </IconButton>
          } button onClick={() => nav(`/preview/${f.id}`)}>
            <ListItemText primary={f.name} secondary={new Date(f.createdAt).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </>
  );
}