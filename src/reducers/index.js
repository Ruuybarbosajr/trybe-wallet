import { combineReducers } from 'redux';
import userReduce from './user';
import walletReducer from './wallet';

const rootReducers = combineReducers({ user: userReduce, wallet: walletReducer });
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
export default rootReducers;
