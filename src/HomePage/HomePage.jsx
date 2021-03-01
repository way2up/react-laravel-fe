import React from 'react';
import {connect} from 'react-redux';
import {homeActions} from "./home.actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal} from "react-bootstrap";
import InputComponent from "../_components/InputComponent";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            createModalShow: false,
            submitted: false,
            product_name: '',
            product_description: '',
            category_id: '',
            item_name: '',
            item_text: '',
            item_price: '',
            item_quantity: '',
            item_bonus: '',

        };

        this.handleLogoutUser = this.handleLogoutUser.bind(this);
        this.handleCreateProductShow = this.handleCreateProductShow.bind(this);
        this.handleCreateProductClose = this.handleCreateProductClose.bind(this);
        this.handleCreateProduct = this.handleCreateProduct.bind(this);
    }

    componentDidMount() {
        this.props.getProducts();
        this.props.getCategories();
    }

    handleDeleteProduct(id) {
        // return (e) => this.props.deleteUser(id);
    }

    handleLogoutUser(e) {
        e.preventDefault();
        this.props.apiLogout();
    }

    handleCreateProductShow(e) {
        e.preventDefault();
        this.setState({createModalShow: true});
    }

    handleCreateProduct(e) {
        e.preventDefault();
        this.setState({submitted: true});

        const {product_name, product_description, category_id, item_name,
            item_text, item_price, item_quantity, item_bonus,
        } = this.state;
        if ( product_name && product_description && category_id && item_name &&
            item_text && item_price && item_quantity && item_bonus) {
            this.props.login( product_name, product_description, category_id,
                item_name, item_text, item_price, item_quantity, item_bonus,);
        }
    }

    handleCreateProductClose() {
        this.setState({createModalShow: false});
    }

    render() {
        const {user, products, categories} = this.props;
        const {createModalShow, product_name, product_description, category_id, item_name,
            item_text, item_price, item_quantity, item_bonus, submitted} = this.state;
        return (
            <div className="container">
                <div className="w-100 mb-2 d-flex align-items-center justify-content-between pt-5">
                    {user && <h3>Hi {user.name}!</h3>}
                    <div className='d-flex align-items-center justify-content-between'>
                        <Button variant="primary mr-2" onClick={this.handleCreateProductShow}>
                            +New Product
                        </Button>
                        <button className='btn btn-success' onClick={this.handleLogoutUser}>Logout</button>
                    </div>
                </div>
                {products.loading && <em>Loading products...</em>}
                <table className="table table-bordered bg-white">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created at</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.items && products.items.map((product, index) => {
                        return <tr key={product.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.created_at}</td>
                            <td className='d-flex align-items-center'>
                                <FontAwesomeIcon className='mr-1 cursor-pointer' icon={faEdit}/>
                                <FontAwesomeIcon className='cursor-pointer' icon={faTrashAlt}/>
                            </td>
                        </tr>
                    })
                    }
                    </tbody>
                </table>
                {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter"
                       className='' show={createModalShow} onHide={this.handleCreateProductClose}>
                    <Modal.Header className="text-center" closeButton>
                        <Modal.Title>Create new product</Modal.Title>
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                            <div className='p-3 d-inline form-row'>
                                <label htmlFor="productCategories">Product Categories</label>
                                <select className="form-control mb-2" id="productCategories">
                                    <option>Default select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                <InputComponent
                                    submitted={submitted}
                                    containerClass="col-md-6"
                                    name="product_name"
                                    placeholder="Name"
                                    errorMessage= {submitted && !product_name && "Product name is required"}
                                    label="Product name"/>
                                <InputComponent
                                    submitted={submitted}
                                    required={true}
                                    containerClass="col-md-6"
                                    name="product_description"
                                    placeholder="Description"
                                    label="Product description"
                                />
                                <InputComponent
                                    submitted={submitted}
                                    required={true}
                                    containerClass="col-md-6"
                                    name="item_name"
                                    placeholder="Item name"
                                    label="Item name"
                                />
                                <InputComponent
                                    submitted={submitted}
                                    required={true}
                                    containerClass="col-md-6"
                                    name="item_text"
                                    placeholder="Item text"
                                    label="Item text"
                                />
                                <InputComponent
                                    submitted={submitted}
                                    required={true}
                                    containerClass="col-md-6"
                                    type="number"
                                    name="item_price"
                                    placeholder="Item price"
                                    label="Item price"
                                />
                                <InputComponent
                                    submitted={submitted}
                                    required={true}
                                    containerClass="col-md-6"
                                    type="number"
                                    name="item_quantity"
                                    placeholder="Item quantity"
                                    label="Item quantity"
                                />
                                <InputComponent
                                    submitted={submitted}
                                    required={true}
                                    containerClass="col-md-6"
                                    type="number"
                                    name="item_bonus"
                                    placeholder="Item bonus"
                                    label="Item bonus"
                                />
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCreateProductClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleCreateProduct}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );

    }
}

function mapState(state) {
    const {products, authentication , categories} = state;
    const {user} = authentication;
    return {user, products, categories};
}

const actionCreators = {
    getProducts: homeActions.getAllProducts,
    apiLogout: homeActions.apiLogout,
    getCategories: homeActions.getAllCategories,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};