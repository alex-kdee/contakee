import {
  Button,
  Container,
  makeStyles,
  Typography,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "./list";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "blue",
    position: "absolute",
    right: 600,
    color: "white",
    fontSize: 20,
    [theme.breakpoints.down("sm")]: {
      left: 270,
      width: 100,
      fontSize: 15,
    },
  },
  divContain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },

  container: {
    width: 800,
    height: "auto",

    padding: 0,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    [theme.breakpoints.down("sm")]: {
      width: 375,
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
}));

function Home() {
  const classes = useStyles();

  const [listofcontact, setListofcontact] = useState([]);
  const [url, seturl] = useState([]);
  useEffect(() => {
    display();
  }, []);
  async function display() {
    var file = await Axios.get("http://localhost:3001");
    seturl(file.data);
    // console.log(url);

    {
      url.map((letter) => {
        console.log(letter._id);
        console.log(typeof letter.name);
      });
    }
  }
  const nu = "kd";

  return (
    <div className={classes.home}>
      <div className={classes.divContain}>
        <Container className={classes.container}>
          <div className={classes.header}>
            <Typography className={classes.topic}>CONTACTER</Typography>
            <Button className={classes.button} component={Link} to={"/add"}>
              ADD USER
            </Button>
          </div>
          <div>
            {url.map((letter) => {
              return (
                <div>
                  <List name={letter.name} contact={letter.contact} id={letter._id} />
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
