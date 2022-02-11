import {
  Button,
  makeStyles,
  Container,
  Typography,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  submit: {
    backgroundColor: "red",
    color: "white",
    margin: 10,
    fontSize: 18,
    marginTop: 30,
  },
  cancel: {
    backgroundColor: "grey",
    color: "white",
    margin: 10,
    fontSize: 18,
    marginTop: 30,
  },
  button: {
    display: "flex",
    justifyContent: "center",
  },

  divContain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },

  container: {
    width: 800,
    height: 600,

    padding: 0,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    [theme.breakpoints.down("sm")]: {
      width: 375,
      height: 400,
    },
  },
  header: {
    backgroundColor: "#0b0221",
    width: 800,
    height: 80,
    // marginRight: theme.spacing(10),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: 295,
      justifyContent: "space-between",
      paddingLeft: 80,
    },
  },
  topic: {
    fontSize: 30,
    fontWeight: 500,
    postion: "absolute",
    left: 50,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: 25,
    },
  },
  input: {
    margin: 20,
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
}));

function Edit() {
  const classes = useStyles();
  const location = useLocation();
  const [state, setstate] = useState({
    detail: location.state.name,
    contact: location.state.contact,
  });

  // group state handling

  const changeHandle = (e) => {
    const value = e.target.value;
    setstate({
      ...state,
      [e.target.name]: value,
    });
  };

  const onsubmit = () => {
    Axios.put(`https://contakee.herokuapp.com/`, {
      data: {
        _id: location.state.id,
        name: state.detail,
        contact: state.contact,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.home}>
      <div className={classes.divContain}>
        <Container className={classes.container}>
          <div className={classes.header}>
            <Typography className={classes.topic}>CONTACTER</Typography>
          </div>
          <div className={classes.content}>
            <div className={classes.field}>
              <TextField
                className={classes.input}
                id='outlined-basic'
                label='Name'
                variant='outlined'
                value={state.detail}
                name='detail'
                onChange={changeHandle}
              />

              <TextField
                className={classes.input}
                id='outlined-basic'
                label='Mobile Number'
                variant='outlined'
                value={state.contact}
                onChange={changeHandle}
                name='contact'
              />
            </div>
            <div className={classes.button}>
              <Button
                className={classes.submit}
                onClick={onsubmit}
                component={Link}
                to={"/"}
              >
                Save Changes
              </Button>
              <Button className={classes.cancel} component={Link} to={"/"}>
                Cancel
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Edit;
