import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import loginImage from '../Images/log_in.png';
import useStore from '../store';
import { errorToast, successToast } from '../utils';

const Login = () => {
  const { login, loading } = useStore();

  let navigate = useNavigate();
  const initialData = {
    email: '',
    password: '',
  };
  const [data, setData] = useState(initialData);

  const handleonchange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    e.target.value = 'Logging In...';
    try {
      await login(data);
      successToast('Login Successful!');
      navigate('/', { replace: true });
    } catch (err) {
      errorToast(err.message || 'Login failed');
    } finally {
      e.target.value = 'Log In';
    }
  };

  return (
    <>
      <div className="content mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <center>
                <img src={loginImage} alt="Image" className="img-fluid cvimage mt-5" />
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
                          <NavLink to="/signup" className="loginredirect text-decoration-none">
                            Click Here
                          </NavLink>
                        </u>
                      </span>
                    </div>
                    <input
                      type="submit"
                      disabled={loading}
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
