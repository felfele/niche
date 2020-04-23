import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import { rootReducer } from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

export default () => {
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const defaultMiddlewareConfig = {
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }
    const middleware = [
        ...getDefaultMiddleware(defaultMiddlewareConfig)
    ];
    const store = configureStore({
        reducer: persistedReducer,
        middleware,
    })
    const persistor = persistStore(store)
    return { store, persistor }
}
