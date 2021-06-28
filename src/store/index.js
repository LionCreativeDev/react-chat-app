import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducer, {}, applyMiddleware(thunk));

export default store;


//with state persist
//npm install redux-persist
// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

// import reducer from './reducer'

// const persistConfig = {
//    key: 'root',
//    storage,
// }

// const persistedReducer = persistReducer(persistConfig, reducer);
// let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
// let persistor = persistStore(store);

// export default store;
//with state persist