import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";
import login from "../Images/log_in.png";

const Login = (props) => {
  const Authenticate = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}makecv`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resJson = await res.json();
      if (resJson.message === "Authenticated") props.setToggle(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Authenticate();
  }, []);
  let navigate = useNavigate();
  const initialData = {
    email: "",
    password: "",
  };
  const [Data, setData] = useState(initialData);

  const handleonchange = (e) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    e.target.value = "Logging In...";
    const { email, password } = Data;
    let res;
    res = await fetch(`${process.env.REACT_APP_SERVER_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methos": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    e.target.disabled = false;
    e.target.value = "Login";
    if (res.status !== 200 && res.status !== 400) {
      toast.error("Someting went wrong, Please try again after sometime", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const resJson = await res.json();
    if (resJson.message) {
      toast.success(resJson.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      props.setToggle(true);
      navigate("../makeCV", { replace: true });
    }
    if (resJson.error) {
      toast.error(resJson.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!resJson) {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <div className="content mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <center>
                <img
                  src={login}
                  alt="Image"
                  className="img-fluid cvimage mt-5"
                />
              </center>
            </div>
            <div className="col-md-6 contents mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3 id="color" className="fw-bold display-3">
                      Log In
                    </h3>
                  </div>
                  <form method="post">
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleonchange}
                      ></input>
                    </div>
                    <div className="form-group first">
                      <input
                        type="password"
                        className="form-control mt-3"
                        name="password"
                        placeholder="Password"
                        id="pswd"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="d-flex mb-3 mt-1 align-items-center">
                      <span className="ml-auto">
                        Don't Have Account ?&nbsp;
                        <u>
                          <NavLink
                            to="/signup"
                            className="loginredirect text-decoration-none"
                          >
                            Click Here
                          </NavLink>
                        </u>
                      </span>
                    </div>
                    <input
                      type="submit"
                      disabled={false}
                      value="Log In"
                      className="btn btn-primary"
                      id="lbtn"
                      onClick={sendData}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
