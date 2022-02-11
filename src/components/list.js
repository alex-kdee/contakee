import React, { useContext, useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import FileCopy from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles((theme) => ({
  content: {
    color: "black",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    margin: "10px 5px 10px 5px",
  },

  label: {
    width: 800,
    // border: "1px solid black",
    fontSize: 30,
  },
  edit: {
    backgroundColor: "green",
    color: "white",
    margin: 0,
    marginLeft: 12,
    fontSize: 18,

    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
    },
  },
  delete: {
    backgroundColor: "red",
    color: "white",
    margin: 10,
    fontSize: 18,

    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
    },
  },
  font: {
    fontSize: 25,
    margin: "15px 0px 10px 20px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  copy: {
    backgroundColor: "#cfc9ba",
  },
}));

const List = (props) => {
  const classes = useStyles();
  // const [listofcontact, setListofcontact] = useState([]);
  // useEffect(() => {
  //   Axios.get("http://localhost:3001").then((response) => {
  //     response.data.map((item) => {
  //       setListofcontact((prev) => [...prev, item]);
  //     });
  //   });
  // }, []);
  const deleteon = async (id) => {
    try {
      console.log(id);
      const res = await Axios.delete(`http://localhost:3001/${id}`);
      if (res.data.success) {
        alert(res.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // copy to clipboard

  const [copy, setcopy] = useState(false);

  const handleClick = () => {
    setcopy(true);
  };

  // sharing data with other pages

  const navigate = useNavigate();
  const toedit = () => {
    console.log(props.contact);
    navigate(`/edit/${props.id}`, {
      state: { name: props.name, contact: props.contact, id: props.id },
    });
  };

  return (
    <div className={classes.content}>
      <div className={classes.label}>
        <div className={classes.font} style={{ fontFamily: "Raleway" }}>
          <div>{props.name}</div>
          <div>{props.contact}</div>
        </div>
        <div className={classes.button}>
          <CopyToClipboard text={props.contact} >
            <Button className={classes.copy} startIcon={<FileCopy />} onClick={handleClick}>
              <span>{copy?"Copied!":"Copy"}</span>
            </Button>
          </CopyToClipboard>

          <Button
            onClick={() => {
              toedit();
            }}
            className={classes.edit}
          >
            Edit
          </Button>
          <Button
            className={classes.delete}
            onClick={(e) => deleteon(props.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default List;
