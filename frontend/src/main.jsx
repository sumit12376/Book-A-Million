import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Allbooks from './pages/Allbooks.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Singnup.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import ViewBookDetail from './components/ViewBookDetail/ViewBookDetail.jsx';
import store from './Store/index.js';
import { Provider, useSelector } from 'react-redux';
import Logout from './pages/Logout.jsx';
import Favourites from './components/Profilebar/Favourites.jsx';
import UserOrder from './pages/UserOrder.jsx';
import Setting from './components/Profilebar/Setting.jsx';
import AddBook from './pages/AddBook.jsx';
import UserOrderHistory from './components/Profilebar/userOrderHistory.jsx';
import { Navigate } from 'react-router-dom';
import Updatebook from './pages/Updatebook.jsx';

const RouterWrapper = () => {
  const userRole = useSelector((state) => state.auth.role);
  console.log("User Role:", userRole);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App userRole={userRole} />}>
        <Route path="" element={<Home />} />
        <Route path="all-books" element={<Allbooks />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
       < Route path="updatebook/:id" element={<Updatebook />} />
        <Route path="profile" element={<Profile />}>
          <Route index element={userRole === 'user' ? <Favourites /> : <UserOrder />} />
          <Route path="orderhistory" element={userRole === 'user' ? <UserOrderHistory /> : <AddBook />} />
          <Route path="addbook" element={userRole === 'admin' ? <AddBook /> : <Navigate to="/profile" />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="logout" element={<Logout />} />
        <Route path="viewbookdetail/:id" element={<ViewBookDetail />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterWrapper />
    </Provider>
  </StrictMode>
);
