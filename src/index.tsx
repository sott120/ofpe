import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { CookiesProvider, Cookies } from 'react-cookie';
import axios from 'axios';
import { replaceUser } from './store/userSlice';
axios.defaults.withCredentials = true;

const cookies = new Cookies();

let loadUser = () => {
  console.log(cookies.get('user'));
  let data = { id: cookies.get('user'), name: cookies.get('name') };
  store.dispatch(replaceUser(data));
};
loadUser();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
