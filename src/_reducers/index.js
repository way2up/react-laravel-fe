import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {products} from "./products/products.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  products
});

export default rootReducer;