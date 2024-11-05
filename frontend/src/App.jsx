import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';
import { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { login, changeRole } from './store/auth';
import Cookies from 'js-cookie'; 

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const id = Cookies.get('id');
    const token = Cookies.get('token');
    const role = Cookies.get('role'); 
    
    if (id && token && role) {
      dispatch(login());
      dispatch(changeRole(role));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
