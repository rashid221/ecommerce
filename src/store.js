import { createStore } from "redux";
import rootred from "./redux/reducers/main";
import { persistReducer,persistStore } from "redux-persist";
import storage  from "redux-persist/lib/storage";

const persistConfig={
    key:'persist-store',
    storage
}
const persistedReducer = persistReducer(persistConfig,rootred);
const store = createStore(
    persistedReducer
    )
export const persistor = persistStore(store);
export default store;
