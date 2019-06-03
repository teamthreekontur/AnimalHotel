import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import App from "./components/App.js";
import {isLoggedIn} from "./service/API";

let store = {
    isLoggedIn: isLoggedIn(),
    activeMenu: ''
};

function updateDOM(){
    ReactDOM.render((
        <BrowserRouter>
            <App/>
        </BrowserRouter>), document.getElementById("root"));
}

updateDOM();

export {store, updateDOM}