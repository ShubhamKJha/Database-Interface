import { combineReducers } from "redux";
import sampleConsoleInput from "../main/console/sampleinput/reducer";
import consoleHistory from "../main/console/history/reducer";
import consoleInput from "../main/console/input/reducer";

const reducer = combineReducers ({
    // sampleConsoleInput,
    consoleHistory,
    consoleInput
});

export default reducer;
