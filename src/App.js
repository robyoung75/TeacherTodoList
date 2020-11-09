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

import AppLoginBar from "./AppBar";

import apple from "./apple.png";

function App() {
  // state variables to hold and set short term memory or state.
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000)
  );

  // console.log("I am the real-time input >>>>", input); // logs user input real time.
  // useEffect fires after the initial render and only fires on load or update. In this case we are accessing the firestore
  // database. Following render the database information is used to poputlate the todo list. On change or update of the
  // database useEffect will fire again.
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // // Notes on authUser object
        // let displayName = authUser.displayName;
        // let email = authUser.email;
        // let emailVerified = authUser.emailVerified;
        // let photoURL = authUser.photoURL;
        // let isAnonymous = authUser.isAnonymous;
        // let uid = authUser.uid;
        // let providerData = authUser.providerData;

        db.collection("todos") // provides access to the database collection of todos.
          .orderBy("timestamp", "desc") // orders the collection of todos by timestamp and in decending order.
          .onSnapshot((snapshot) => {
            // console.log(
            //   "I am useEffect function logging a snapshot of doc.data() >>>",
            //   snapshot.docs.map((doc) => doc.data())
            // );

            // console.log(
            //   "I am useEffect function logging a snapshot of doc.data().todo >>>",
            //   snapshot.docs.map((doc) => doc.data().todo)
            // );

            // console.log(
            //   "I am useEffect function logging a snapshot of doc.id >>>",
            //   snapshot.docs.map((doc) => doc.id)
            // );

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

        setUser(authUser.email);
      } else {
        setUser(null);
      }
    });
  }, [user]); // If an array variable is included use effect will fire when variable is updated and rendered.
  // An empty array only fires on refresh or restart.

  const signIn = (e) => {
    if (user === null) {
      e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("USER_LOGGED_IN I AM FIREBASE.AUTH() >>> ", auth);
      })
      .catch((error) => console.log(error.message, error.code));
    setEmail("");
    setPassword("");

    }
    
  };

  const signOut = () => {
    if (user != null) {
      auth
        .signOut()
        .then(setUser(null), console.log("USER HAS SIGNED OUT"))
        .catch((error) => console.log(error.message, error.code));
      setUser(null);
    }
    else {
      alert("you are not signed in")
    }
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
      .then(function (docRef) {
        console.log("To Do successfully added! DOC_REF_ID", docRef.id);
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
        <div className="app__nav">
          <AppLoginBar
            user={user}
            signIn={signIn}
            signOut={signOut}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        </div>
        <div className="app__container">
          <div className="app__header">
            <div className="app__headerLeft">
              <span>
                <img
                  src={apple}
                  width="80"
                  height="80"
                  style={{ marginRight: 30 }}
                  alt="apple"
                />
              </span>
            </div>
            <div className="app__headerRight">
              <Typography color="primary" variant="h5">
                Teacher's To Do List
              </Typography>

              <Typography
                color="secondary"
                variant="subtitle1"
              >{`${date}, ${time}`}</Typography>
            </div>
          </div>
          <div className="app__todoInput">
            <form onSubmit={addTodo}>
              <FormControl style={{ paddingBottom: "30px" }}>
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
                size="small"
              >
                <Typography> Create To Do </Typography>
              </Button>
            </form>
          </div>
          <div className="app__todosContainer">
            <ul>
              {/* Remember use () when you plan to return element */}
              {/* todos is an array of objects. map todos and for each todo return todo */}

              {!user
                ? null
                : todos.map((todo) => (
                    <Todo todo={todo} apple={apple} key={todo.id} />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
