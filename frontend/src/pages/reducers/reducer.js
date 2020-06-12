import { combineReducers } from "redux";
import consoleHistory from "../main/console/history/reducer";
import consoleInput from "../main/console/input/reducer";
import databaseReducer from "../main/database/reducer";
import userReducer from "./userReducer";

const reducer = combineReducers({
  userReducer,
  databaseReducer,
  consoleHistory,
  consoleInput
});

export default reducer;
