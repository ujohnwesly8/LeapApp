import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import ProductSlice from './slice/productSlice';
import createSagaMiddleware from 'redux-saga';
import Reducers from './reducers/reducers';
import authReducer from './reducers/reducers';
import {AddressReducers} from './reducers/AddressReducers';
import {ItemsReducer} from './reducers/Additemsreducers';
import SizeReducer from './reducers/sizeReducer';
import GenderReducer from './reducers/GenderReducer';
import Rolereducer from './reducers/Rolereducer';
import CartReducer from './reducers/cartReducer';
import WishlistReducer from './reducers/wishlistReducer';
import UserProductSlice from './slice/userProductSlice';
import wishlistSlice from './slice/wishlistSlice';
import cartSlice from './slice/cartSlice';
import orderSlice from './slice/orderSlice';
import editItemSlice from './slice/editItemSlice';
// import EditItemSlice from '../redux/slice/editItemSlice';
// import {fetchEditItemSaga} from './thunks/editItemThunk';
import {all} from 'redux-saga/effects';
import thunk from 'redux-thunk';

const RootReducers = combineReducers({
  Reducers,
  products: ProductSlice,
  auth: authReducer,
  AddressReducers,
  ItemsReducer,
  SizeReducer,
  GenderReducer,
  Rolereducer,
  CartReducer,
  WishlistReducer,
  UserProducts: UserProductSlice,
  WishlistProducts: wishlistSlice,
  CartProducts: cartSlice,
  OrderProducts: orderSlice,
  editItem: editItemSlice,
});

// function* rootSaga() {
//   yield all([fetchEditItemSaga()]);
// }

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  RootReducers,
  applyMiddleware(sagaMiddleware, thunk),
);
// sagaMiddleware.run(rootSaga);
