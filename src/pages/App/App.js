import { useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import Auth from '../AuthPage/AuthPage';
import OrderHistory from '../OrderHistory/OrderHistoryPage';
import NavBar from '../../components/NavBar';
import './App.module.css';
import '../../../src/index.css';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistory/OrderHistoryPage';

function App() {
  const [user, setUser] = useState(getUser())
  return (
    // Check if there is a user logged in
    // If user is logged in, take them to NewOrder page
    //Otherwise, take them to Auth page
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path='/orders/new' element={<NewOrderPage user={user} setUser={setUser} />} />
            <Route path='/orders/' element={<OrderHistoryPage user={user} setUser={setUser} />} />
            <Route path="/*" element={<Navigate to="/orders/new" />} />
          </Routes>
        </>
      ) : (
        <Auth setUser={setUser} />
      )}
    </main>
  );
}

export default App;
