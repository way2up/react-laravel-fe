import React from 'react';
import { connect } from 'react-redux';
import {homeActions} from "./home.actions";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogoutUser = this.handleLogoutUser.bind(this);
    }

    componentDidMount() {
        this.props.getProducts();

    }

    handleDeleteUser(id) {
        // return (e) => this.props.deleteUser(id);
    }

    handleLogoutUser(e) {
        e.preventDefault();
        this.props.apiLogout();
    }

    render() {
        const { user, products } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.name}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {products.loading && <em>Loading users...</em>}
                {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                {products.items && <ul> {products.items.map((product, index) =>
                        <li key={product.id}>
                            {product.name + ' ' + product.total_bonus}
                            {
                            }
                        </li>
                    )}
                </ul>
                }
                <p>
                    <button onClick={this.handleLogoutUser} >Logout</button>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { products, authentication } = state;
    const { user } = authentication;
    return { user, products };
}

const actionCreators = {
    getProducts: homeActions.getAllProducts,
    apiLogout: homeActions.apiLogout,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };