import { configureStore } from '@reduxjs/toolkit'
import newsHeadlineReducer from './slice/newsSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist'
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, newsHeadlineReducer);
export const store = configureStore({
    reducer: {
        headlines: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})
