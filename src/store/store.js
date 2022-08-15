import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import { loggerMiddleware } from "./middleware/logger";
// root reducer

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// use middleware only of env is anything but production and then filter out anything that is false from the the middlewares array,
//  as you dont want to pass false as a midleware

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

// modify compose method to work with redux dev tools extension
// If env is anything but production and window object exists in browser (at build time there is no window object, so may give an error while building)
// and the devtools extension exists in browser then use the extension
// else, use the default compose method from redux

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
