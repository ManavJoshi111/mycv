import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Images/Loading.gif';
import useStore from '../store';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useStore();

  const doLogout = async () => {
    await logout();
  };

  useEffect(() => {
    doLogout();
    navigate('../', { replace: true });
  }, []);
  return (
    <>
      <center>
        <img src={Loading} alt="" height={500} />
        <h1 className="text-dark">Logging Out...</h1>
      </center>
    </>
  );
};

export default Logout;
