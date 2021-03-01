import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import {store} from './_helpers';
// setup fake backend
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>,
    document.getElementById('root')
);

reportWebVitals();
