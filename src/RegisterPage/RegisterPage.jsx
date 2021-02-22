import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { authRegisterActions } from './auth-register.actions';
import './authStyles.scss'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.name && user.email && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <section className="d-flex align-items-center">
                <div className="container active">
                    <div className="user  signupBx">
                        <div className="formBx">
                            <form onSubmit={this.handleSubmit}>
                                <h2>Create an account</h2>
                                <input className={'form-group' + (submitted && !user.name ? ' is-invalid-input' : '')} onChange={this.handleChange} type="text" name="name" placeholder="Username"/>
                                {submitted && !user.name &&
                                <div className="is-invalid font-italic h6 ">Name is required</div>
                                }
                                <input className={'form-group' + (submitted && !user.email ? ' is-invalid-input' : '')} onChange={this.handleChange}  type="email" name="email" placeholder="Email Address"/>
                                {submitted && !user.email &&
                                <div className="is-invalid font-italic h6 ">Email is required</div>
                                }
                                <input className={'form-group' + (submitted && !user.password ? ' is-invalid-input' : '')} onChange={this.handleChange} type="password" name="password" placeholder="Create Password"/>
                                {submitted && !user.password &&
                                <div className="is-invalid font-italic h6 ">Password is required</div>
                                }
                                <input className={'form-group' + (submitted && !user.password_confirmation ? ' is-invalid-input' : '')} onChange={this.handleChange} type="password" name="password_confirmation" placeholder="Confirm Password"/>
                                <div>
                                    <button type="submit" className="btn btn-primary">Sign Up</button>
                                </div>
                                <p className="signup">
                                    Already have an account ?
                                    {registering &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    <Link to="/login" > Sign in.</Link>
                                </p>
                            </form>
                        </div>
                        <div className="imgBx"><img
                            src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
                            alt=""/></div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: authRegisterActions.register
}

const connectedRegisterPage = withRouter(connect(mapState, actionCreators)(RegisterPage));
export { connectedRegisterPage as RegisterPage };