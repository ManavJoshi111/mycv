import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/profile.css';
import useStore from '../store';
import { errorToast } from '../utils';

const Profile = () => {
  const navigate = useNavigate();
  const { user, authenticate } = useStore();

  useEffect(() => {
    if (!user) {
      authenticate().catch((err) => {
        errorToast(err.message || 'Please Login first');
        navigate('../login', { replace: true });
      });
    }
  }, [user, authenticate, navigate]);

  const User = user;

  return (
    User && (
      <>
        <div className="container emp-profile">
          <form method="post">
            <div className="row">
              <div className=""></div>
              <div className="row-md-6">
                <div className="profile-head">
                  <h3 id="name">{User.name}</h3>
                  <p>{User.about}</p>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        About
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work mt-0">
                  <h5>Certificate</h5>
                  {User.certificates?.length > 0 ? (
                    User.certificates.map((certy, index) => {
                      return (
                        <p className="mb-1" key={`cert-${index}`}>
                          {certy}
                        </p>
                      );
                    })
                  ) : (
                    <p>You haven't added any certificates</p>
                  )}
                </div>
                <div className="profile-work mt-0">
                  <h5>Projects</h5>
                  {User.ptitle1 ? (
                    <p className="mb-1">{User.ptitle1}</p>
                  ) : (
                    "You haven't added any projects"
                  )}
                  {User.ptitle2 ? <p className="mb-1">{User.ptitle2}</p> : ''}
                </div>
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{User.name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{User.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>{User.number}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Address</label>
                      </div>
                      <div className="col-md-6">
                        <p>{User.address}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Portfolio</label>
                      </div>
                      <div className="col-md-6">
                        <p>{User.portfolio}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Github</label>
                      </div>
                      <div className="col-md-6">
                        <p>{User.github}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Experience</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Hourly Rate</label>
                      </div>
                      <div className="col-md-6">
                        <p>10$/hr</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Total Projects</label>
                      </div>
                      <div className="col-md-6">
                        <p>230</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>English Level</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Availability</label>
                      </div>
                      <div className="col-md-6">
                        <p>6 months</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Your Bio</label>
                        <br />
                        <p>Your detail description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default Profile;
