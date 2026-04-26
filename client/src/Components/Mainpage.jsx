import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import Form from './Form';
import Resume_1 from './Resume_1';
import Resume_2 from './Resume_2';
import '../Styles/mainpage.css';
import useStore from '../store';

const Mainpage = () => {
  const navigate = useNavigate();
  const componentRef = useRef();
  const {
    user,
    loading,
    authenticate,
    cv,
    setCvFromUser,
    saveCv,
    selectedTemplate,
    setSelectedTemplate,
  } = useStore();

  useEffect(() => {
    if (!user) {
      authenticate().catch(() => {
        toast.warn('Please Login...!');
        navigate('../login', { replace: true });
      });
    }
  }, [user, authenticate, navigate]);

  useEffect(() => {
    if (user) {
      setCvFromUser(user);
    }
  }, [user, setCvFromUser]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (loading && !user) {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (cv.name) {
    return (
      <>
        <div className="container-fluid mt-3 flex-wrap d-flex flex-column flex-md-row justify-content-center align-items-flex-baseline">
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">Select Template</option>
            <option value="1">Template 1</option>
            <option value="2">Template 2</option>
          </select>
          <div className="leftcontainer">
            <h2 className="heading h1 fw-bold d-block">Enter Your Details : </h2>
            <Form />
          </div>
          <div className="rightcontainer mt-4">
            {selectedTemplate === '1' ? (
              <Resume_1 data={cv} ref={componentRef} username={cv.username}></Resume_1>
            ) : selectedTemplate === '2' ? (
              <Resume_2 data={cv} ref={componentRef} username={cv.username}></Resume_2>
            ) : (
              <h2 className="heading h1 fw-bold d-block">Select Template</h2>
            )}
          </div>
          <button
            type="button"
            disabled={false}
            className="btn btn-primary mb-4 mt-2 align-self-center"
            onClick={async () => {
              handlePrint();
              try {
                await saveCv();
              } catch (err) {
                toast.error(err.message || 'Could not save CV');
              }
            }}
          >
            Download PDF
          </button>
        </div>
      </>
    );
  } else {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default Mainpage;
