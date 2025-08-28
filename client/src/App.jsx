import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/main.css';
import { Navbar } from './components';
import AppRoutes from './router';
import useStore from './store';

const App = () => {
  const { authenticate, error, loading } = useStore();

  useEffect(() => {
    /**
     * authenticate() will call an API to get details of the user.
     * Until it's pending, we will show loader. When it's error, we will show an error using toast and if we got the data, we will let the user in.
     */
    authenticate(); // token is set by, callApi, so no need to pass
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <ToastContainer style={{ width: '400px' }} />
    </BrowserRouter>
  );
};

export default App;
