import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/Routes';

import {ContextProvider} from './context/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));

 root.render(
  <React.StrictMode>
    <ContextProvider>
        <BrowserRouter>
        <div>
            <Routes />
        </div>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>  
);  


 /* ReactDOM.render(
  <ContextProvider>
    <App/>
  </ContextProvider>,
  document.getElementById('root')



  ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
    <div>
        <Routes />
    </div>
  </BrowserRouter>
 </ContextProvider>,
  document.getElementById('root')
);  
);*/  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
