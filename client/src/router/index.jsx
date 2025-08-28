import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { Header, Login, Logout, Mainpage, Profile, Signup } from '../components';

export default () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route exact path="/" element={<Header />}></Route>
        <Route exact path="/logout" element={<Logout />}></Route>
        <Route exact path="/makeCV" element={<Mainpage />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Route>
    </Routes>
  );
};
