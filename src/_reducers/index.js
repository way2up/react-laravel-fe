import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import {products} from "./products/products.reducer";
import {categories} from "./categories/categories.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  products,
  categories,
});

export default rootReducer;