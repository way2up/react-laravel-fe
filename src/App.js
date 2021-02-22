import './App.css';
import React, {useEffect} from 'react';
import {alertActions} from './_actions';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from "react-router";
import {HomePage} from './HomePage';
import {LoginPage} from './LoginPage';
import {RegisterPage} from './RegisterPage';
import './scss/main.scss'

import { withRouter } from 'react-router-dom'
import PrivateRoute from "./_components/PrivateRoute";

function App(props) {
    useEffect(() => {
        props.history.listen(() => {
            // clear alert on location change
            props.clearAlerts();
        });
    });

    const {alert} = props;
    return (
        <div className="w-100 position-relative">
            <div className="position-absolute alert-container">
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
            </div>

            <Switch>
                <PrivateRoute exact path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/asd" component={RegisterPage}/>
                <Redirect from="*" to="/"/>
            </Switch>
        </div>
    );
}

function mapState(state) {
    const {alert} = state;
    return {alert};
}

const actionCreators = {
    clearAlerts: alertActions.clear
};
const connectedApp = connect(mapState, actionCreators)(App);

export default withRouter(connectedApp);
