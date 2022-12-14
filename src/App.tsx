import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyles from './layout/GlobalStyles';
import axios from 'axios';
import { useState, useRef } from 'react';
import { Login, Join } from './Pages/LoginJoin';
import Write from './Pages/Write';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Layout from './layout/Layout';
import LayoutNotHeader from './layout/LayoutNotHeader';
import Main from './Pages/Main';

// if (process.env.NODE_ENV === 'production') {
//   console.log = () => {};
//   console.warn = () => {};
// }

function App() {
  const [act, SetAct] = useState<boolean | null>(null);
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Main />}
          ></Route>
          <Route
            path='/write'
            element={<Write />}
          ></Route>
          <Route
            path='/write/edit'
            element={<Write />}
          ></Route>
        </Route>
        <Route element={<LayoutNotHeader />}>
          <Route
            path='/login'
            element={<Login />}
          ></Route>
          <Route
            path='/join'
            element={<Join />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
