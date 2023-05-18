import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import newsHeadlineReducer, { save } from './slice/newsSlice'
import { fetchNewsHeadlineData } from './slice/newsSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, newsHeadlineReducer);
export const store = configureStore({
    reducer: {
        headlines: persistedReducer,
    },
})
