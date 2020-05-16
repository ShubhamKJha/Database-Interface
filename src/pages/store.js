import reducer from "./main/console/history/reducer";
// import finalReducer from "./reducers/reducer";

import _ from "lodash";
import { stateSchema } from "./state-schemas/state-schema";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootSaga from "./actions/sagas/root-saga";

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
    // we must clone object prototypes to avoid creating multiple references
    // to the same actual object
    initialState[k] = _.cloneDeep(schema.properties[k].default);
  });
  return initialState;
}
// const initialState = {
//   sampleInput: {
//     numEnterPressed: 0,
//     enterPressed: false
//   },
//   consoleInput: {
//     consoleText: "",
//     consoleTextCache: "",
//     consoleScrollbackPosition: 0
//   },
//   history: []
// }

const store = createStore(
  reducer,
  Object.assign(newSchema(stateSchema), {}),
  composedEnhancers
);

sagaMiddleware.run(rootSaga);
const { dispatch } = store;
export { store, dispatch };
