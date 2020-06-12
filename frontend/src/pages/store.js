import reducer from "./reducers/reducer";

import _ from "lodash";
import { stateSchema } from "./state-schemas/state-schema";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import loggerMiddleware from "./middleware/logger";
import monitorReducerEnhancer from "./enhancers/monitorReducer";

const sagaMiddleware = createSagaMiddleware();

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);
const composedEnhancers = compose(
  middlewareEnhancer,
  monitorReducerEnhancer,
  applyMiddleware(thunk),
  applyMiddleware(sagaMiddleware)
);

export function newSchema(schema) {
  const initialState = {};
  Object.keys(schema.properties).forEach(k => {
    initialState[k] = _.cloneDeep(schema.properties[k].default);
  });
  console.log(initialState);
  return initialState;
}

const store = createStore(
  reducer,
  Object.assign(newSchema(stateSchema), {}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // composedEnhancers
);

const { dispatch } = store;
export { store, dispatch };
