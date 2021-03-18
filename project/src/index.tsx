import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./assets/fonts/roboto/roboto.less";
import "./index.less";
import {AppContextProvider} from "./models/Contexts/AppContext";

const selector = "#root";
const container = document.querySelector(selector);

const Index = () => {

    return (
        <AppContextProvider>
            <App/>
        </AppContextProvider>
    );
};

if (container)
    ReactDOM.render(<Index/>, container);
