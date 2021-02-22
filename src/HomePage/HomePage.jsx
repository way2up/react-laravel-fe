import React from 'react';
import {connect} from 'react-redux';
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
        const {user, products} = this.props;
        return (
            <div className="container">
                <div className="w-100 mb-2 d-flex align-items-center justify-content-between pt-5">
                    {user && <h3>Hi {user.name }!</h3>}
                   <div>
                       <button className='btn btn-success' onClick={this.handleLogoutUser}>Logout</button>
                   </div>
                </div>
                {products.loading && <em>Loading products...</em>}
                <table className="table bg-white ">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created at</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.items && products.items.map((product, index) => {
                        return <tr key={product.id}>
                                    <th scope="row">{index +1}</th>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.created_at}</td>
                                </tr>
                    })
                    }
                    </tbody>
                </table>
                {products.error && <span className="text-danger">ERROR: {products.error}</span>}
            </div>
        );
    }
}

function mapState(state) {
    const {products, authentication} = state;
    const {user} = authentication;
    return {user, products};
}

const actionCreators = {
    getProducts: homeActions.getAllProducts,
    apiLogout: homeActions.apiLogout,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};