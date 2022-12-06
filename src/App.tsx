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
import { useAppSelector } from './store/store';

function App() {
  const [act, SetAct] = useState<boolean | null>(null);
  let id = useAppSelector((state) => state.user.id);
  let name = useAppSelector((state) => state.user.name);
  return (
    <>
      <GlobalStyles />
      {/* <Login/>
            <Join /> */}
      <div>{id}</div>
      <div>{name}</div>
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

      {/* <button
                onClick={() => {
                  SetAct(()=> !act)
                    axios
                        .post("http://localhost:8080/api/test", {
                            firstName: "Fred",
                            lastName: "Flintstone",
                        })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }}
            >
                TEST1
            </button>
            <button
              onClick={() => {
                SetAct(()=> !act)
                  axios
                      .post( ip + "/api/test", {
                          firstName: "Fred",
                          lastName: "Flintstone",
                      })
                      .then(function (response) {
                          console.log(response);
                      })
                      .catch(function (error) {
                          console.log(error);
                      });
              }}
          >
              TEST2
            </button> */}
    </>
  );
}

export default App;
