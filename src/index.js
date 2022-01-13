import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import "./fonts.css"
import registerServiceWorker from './registerServiceWorker';
import { StoresProvider, stores } from "../src/store";


// axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":8000";
window.apiUrl = "http://192.168.3.91:8000/api/"
// window.apiUrl = "http://192.168.3.80:8000/api/"
//window.apiUrl = `/api/`

ReactDOM.render(

    <>
        <div className="loading" >
            <div className="loader"></div>
        </div>
        <BrowserRouter>
            <StoresProvider value={stores} >
                <App />
            </StoresProvider >
        </BrowserRouter>
    </>
    , document.getElementById('root')
);
registerServiceWorker();