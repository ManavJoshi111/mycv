import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import signin from '../Images/sign_in.png';
import useStore from '../store';
import { errorToast, successToast } from '../utils';

const Signup = () => {
  const { signup, loading } = useStore();
  let navigate = useNavigate();
  const initialvalue = {
    name: '',
    email: '',
    number: '',
    password: '',
    image: null,
  };
  const [Data, setData] = useState(initialvalue);
  const handleonchange = (e) => {
    if (e.target.name !== 'image') {
      setData({
        ...Data,
        [e.target.name]: e.target.value,
      });
    } else {
      setData({
        ...Data,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    e.target.value = 'Signing Up...';
    try {
      const res = await signup(Data);
      successToast(res?.message || 'Account created successfully');
      navigate('../makecv', { replace: true });
    } catch (err) {
      errorToast(err.message);
    } finally {
      e.target.disabled = false;
      e.target.value = 'Sign Up';
    }
  };

  return (
    <>
      <div className="content ">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <center>
                <img src={signin} alt="Image" className="img-fluid cvimage mt-5 pt-5" />
              </center>
            </div>
            <div className="col-md-6 contents mt-3">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3 id="color" className="fw-bold h1">
                      Sign Up
                    </h3>
                  </div>
                  <form method="post">
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-4"
                        placeholder="Name"
                        id="name"
                        name="name"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Email"
                        id="email"
                        name="email"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Contact No"
                        id="contact"
                        name="number"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="password"
                        className="form-control mt-3"
                        placeholder="Password"
                        id="pswd"
                        name="password"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="d-flex mb-3 mt-1 align-items-center">
                      <span className="ml-auto">
                        Already Have Account ?&nbsp;
                        <u>
                          <NavLink to="/login" className="loginredirect text-decoration-none">
                            Click Here
                          </NavLink>
                        </u>
                      </span>
                    </div>
                    <input
                      type="submit"
                      disabled={loading}
                      value="Sign Up"
                      className="btn btn-primary mb-3"
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

export default Signup;
