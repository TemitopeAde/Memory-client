import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authreducer";
import memoryReducer from "./memoryReducer";
import loaderReducer from "./loaderReducer";


const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: [
    "token",
    
  ],
};


const memoriesPersistConfig = {
  key: "memory",
  storage: storage,
  whitelist: [
    "allMemories",
    "memories",
    "currentPage",
    "numberOfPage",
    "statusText",
    "updatedPost"
  ]
};


const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  memory: persistReducer(memoriesPersistConfig, memoryReducer),
  loader: loaderReducer
});

export default reducers;
