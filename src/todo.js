import React, { useState } from "react";
import { db } from "../src/firebase";
import {
  Modal,
  Fade,
  Backdrop,
  ListItem,
  ListItemIcon,
  List,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  InputLabel,
  FormControl,
  Input,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { useStyles } from "./theme";

// Todo component
function Todo(props) {
  // variables setting state for this component
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState(false);
  const classes = useStyles();

  const handleCheck = (event) => {
    event.preventDefault();

    if (checked === false) {
      setChecked(true);

      db.collection("todos")
        .doc(props.todo.id)
        .set(
          {
            checked: true,
          },
          { merge: true }
        )
        .then(function () {
          console.log("Checkbox successfully checked!");
        })
        .catch(function (error) {
          console.error("Error checking the checkbox: ", error);
        });
    } else {
      setChecked(false);
      db.collection("todos")
        .doc(props.todo.id)
        .set(
          {
            checked: false,
          },
          { merge: true }
        )
        .then(function () {
          console.log("Checkbox successfully unChecked!");
        })
        .catch(function (error) {
          console.error("Error unChecking the checkbox: ", error);
        });
    }
  };

  // Allow the user to update a todo list item.
  function updateTodo(event) {
    // prevents the app from reloading following an update. We always want to avoid refresh with React designs.
    event.preventDefault();
    // accesses the database todos by todo id and sets the new todo to the state of the input
    db.collection("todos")
      .doc(props.todo.id)
      .set(
        {
          todo: input,
          id: props.todo.id,
        },
        { merge: true } // merge true merges change rather than overwrite
      )
      .then(function () {
        console.log("To Do successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating To Do: ", error);
      });

    setOpen(false); // sets the state of open to false closing our modal.
    setInput("");
  }

  function deleteTodo(event) {
    event.preventDefault();

    db.collection("todos")
      .doc(props.todo.id)
      .delete()
      .then(function () {
        console.log("To Do successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing To Do: ", error);
      });
  }

  
  return (
  
    <div className="todo">
      <List className={classes.root}>
        <ListItem role={undefined} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              onClick={handleCheck}
              
              checked={props.todo.checked}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography color="primary">
                {
                  <img
                    src={props.apple}
                    width="20"
                    height="20"
                    style={{ marginRight: 5 }}
                  ></img>
                }
                {props.todo.todo}
              </Typography>
            }
            secondary={
              <Typography color="secondary">
                Shaping the future one To Do at a time
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments" onClick={deleteTodo}>
              <DeleteIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="comments"
              onClick={(event) => setOpen(true)}
            >
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={(event) => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={updateTodo}>
              <h2 id="transition-modal-title">
                <Typography color="secondary">Edit To Do</Typography>
              </h2>
              <FormControl>
                <InputLabel htmlFor="my-input">
                  <Typography color="secondary">Update To Do</Typography>
                </InputLabel>

                <Input
                  placeholder={props.todo.todo}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={updateTodo}
                  disabled={!input}
                >
                  <Typography>Update Now</Typography>
                </Button>
              </FormControl>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Todo;
