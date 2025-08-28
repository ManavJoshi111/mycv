import { Outlet, Navigate } from 'react-router-dom';
import useStore from '../store';

export default () => {
  const { user, loading, error } = useStore();

  if (!user) {
    return <Outlet />;
  } else if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error...</div>;
  } else {
    return <Navigate to={'/'} />;
  }
};
