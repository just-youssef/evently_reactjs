import { combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkModeReducer";
import userReducer from "./features/userReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
    darkMode: darkModeReducer,
    user: userReducer
    //add all your reducers here
},);

const presistConfig = {
    key: "root",
    storage,
    version: 1,
}
const persistedReducer = persistReducer(presistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store)

