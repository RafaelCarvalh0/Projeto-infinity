import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers';
import { persistReducer, persistStore } from 'redux-persist';
//import storage from 'redux-persist/lib/storage;
import session from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: session
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };



// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './Reducers';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;
