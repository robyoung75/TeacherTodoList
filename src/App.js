import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./todo";
import { db, auth } from "../src/firebase";
import firebase from "firebase";
import { newTheme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";

import apple from "./apple.png";
import { SettingsInputSvideoRounded } from "@material-ui/icons";

function App() {
  // state variables to hold and set short term memory or state.
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // console.log("I am the real-time input >>>>", input); // logs user input real time.

  // useEffect fires after the initial render and only fires on load or update. In this case we are accessing the firestore
  // database. Following render the database information is used to poputlate the todo list. On change or update of the
  // database useEffect will fire again.
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    db.collection("todos") // provides access to the database collection of todos.
      .orderBy("timestamp", "desc") // orders the collection of todos by timestamp and in decending order.
      .onSnapshot((snapshot) => {
        console.log(
          "I am useEffect function logging a snapshot of the db data >>>",
          snapshot.docs.map((doc) => doc.data())
        );

        console.log(
          "I am useEffect function logging a snapshot of the db todos doc >>>",
          snapshot.docs.map((doc) => doc.data().todo)
        );

        // setTodos sets the state of todos. In this case we take a snapshot of the database todos
        // doc and map the doc
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            checked: doc.data().checked,
          }))
          // takes a snapshot of the db document and sets todo to an array of objects.
          // Object includes the id and the todo. This is the initial state based on db info.
        );
      });
  }, []); // If an array variable is included use effect will fire when variable is updated and rendered.
  // An empty array only fires on refresh or restart.

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("USER_LOGGED_IN >>> ", auth);
      }).catch((error) => console.log(error.message));
      setEmail("")
      setPassword("")
      

  };

  const signOut = () => {
    auth.signOut().then(console.log("YOU ARE SIGNED OUT", user));
  };

  const addTodo = (event) => {
    // very important to prevent refresh after an add to do. Without this each update would result in a refresh
    // with the useEffect function.
    event.preventDefault();

    db.collection("todos")
      .add({
        todo: input,
        checked: checked,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), // time stamp makes sure we are working with firestore sever time making uniform for all inputs
      })
      .then(function () {
        console.log("To Do successfully added!");
      })
      .catch(function (error) {
        console.error("Error adding todo: ", error);
      });

    // this will fire when we click the button
    console.log("I am the button and I am working"); // logs with click of button all good.

    setTodos([...todos, input]); // ...todos, input appends input to todos without the ... we would replace the todos.
    setInput(""); // clears the input after click
  };

  return (
    <ThemeProvider theme={newTheme}>
      <div className="app">
        <div className="app__header">
          <Typography color="primary" variant="h3">
            <span>
              <img
                src={apple}
                width="80"
                height="80"
                style={{ marginRight: 30 }}
              />
            </span>
            Teacher's To Do List
          </Typography>
          <div className="app__signInForm">
            <form>
              <FormControl>
                <InputLabel htmlFor="my-input">
                  <Typography
                    color="primary"
                    style={{ fontSize: 12, color: "lightgray" }}
                  >
                    Sign in email
                  </Typography>
                </InputLabel>

                <Input
                  style={{ marginRight: 25 }}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">
                  <Typography
                    color="primary"
                    style={{ fontSize: 12, color: "lightgray" }}
                  >
                    Sign in password
                  </Typography>
                </InputLabel>

                <Input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                />
              </FormControl>

              <Button
                // disabled={user}
                onClick={signIn}
                variant="contained"
                color="primary"
                style={{ margin: 10 }}
              >
                <Typography>Sign in</Typography>
              </Button>
              <Button
                disabled={!user}
                onClick={signOut}
                variant="contained"
                color="primary"
                style={{ margin: 10 }}
              >
                <Typography>Sign out</Typography>
              </Button>
            </form>
          </div>
        </div>
        <div className="app__todoInput">
          <form onSubmit={addTodo}>
            <FormControl>
              <InputLabel htmlFor="my-input">
                <Typography
                  color="primary"
                  style={{ fontSize: 12, color: "lightgray" }}
                >
                  Write Todo
                </Typography>
              </InputLabel>

              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </FormControl>

            <Button
              disabled={!input}
              onClick={addTodo}
              variant="contained"
              color="primary"
            >
              <Typography> Create To Do </Typography>
            </Button>
          </form>
        </div>

        <ul>
          {/* Remember use () when you plan to return element */}
          {/* todos is an array of objects. map todos and for each todo return todo */}
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} apple={apple} />
          ))}
        </ul>
      </div>
    </ThemeProvider>
  );
}

export default App;
