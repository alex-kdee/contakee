import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import Home from "./components/home";
import Add from "./components/Add";
import Edit from "./components/edit";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const useStyles = makeStyles({});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<Add />} />
            <Route path='/edit/:id' element={<Edit/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
