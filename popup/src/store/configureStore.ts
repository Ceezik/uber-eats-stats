import createSagaMiddleware from "redux-saga";
import { createInjectorsEnhancer, forceReducerReload } from "redux-injectors";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createReducer } from "./reducers";

export default function configureAppStore() {
  const sagaMiddleware = createSagaMiddleware({});
  const { run: runSaga } = sagaMiddleware;

  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== "production",
    enhancers,
  });

  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept("./reducers", () => {
      forceReducerReload(store);
    });
  }

  return store;
}
