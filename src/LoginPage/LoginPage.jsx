import React from 'react';
import {connect} from 'react-redux';
import {authActions} from './auth.actions';
import './authStyles.scss'
import {Link, withRouter} from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false,
            setIsRegister: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {email, password} = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        const {loggingIn} = this.props;
        const {email, password, submitted} = this.state;
        return (
                <section className="d-flex align-items-center">
                    <div className="container">
                        <div className="user signinBx">
                            <div className="im••••••gBx"><img
                                src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
                                alt=""/></div>
                            <div className="formBx">
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <h2>Sign In</h2>
                                    <input className={'form-control ' + (submitted && !email ? ' is-invalid-input' : '')} name="email" value={email} onChange={this.handleChange} type="text" placeholder="Email"/>
                                    {submitted && !email &&
                                    <div className="is-invalid font-italic h6 ">Email is required</div>
                                    }
                                    <input className={'form-control ' + (submitted && !password ? ' is-invalid-input' : '')} name="password" value={password} onChange={this.handleChange} type="password" placeholder="Password"/>
                                    {submitted && !password &&
                                    <div className="is-invalid font-italic h6 ">Password is required</div>
                                    }
                                    <div>
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                    <p className="signup">
                                        Don't have an account ?
                                        {loggingIn &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        <Link to="/register"  >Sign Up.</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
}

function mapState(state) {
    const {loggingIn} = state.authentication;
    return {loggingIn};
}

const actionCreators = {
    login: authActions.login,
    logout: authActions.logout,
};

const connectedLoginPage = withRouter(connect(mapState, actionCreators)(LoginPage));
export {connectedLoginPage as LoginPage};
