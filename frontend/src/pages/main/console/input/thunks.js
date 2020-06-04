import { resetConsole } from "./actions";
import {
  addInputToConsole,
  addToConsoleHistory
} from "../history/actions";

const url = "/console/exec";

export function evalConsoleInput(consoleText) {
  return (dispatch, getState) => {
    // exit if there is no code in the console to  eval
    console.log(consoleText);
    if (!consoleText) return;
    const chunk = {
      chunkContent: consoleText
    };

    dispatch(addInputToConsole(consoleText, "python"))

    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"command":consoleText})
    };


    fetch(url, init)
     .then(res => res.json())
     .then(data => {
       dispatch(
         addToConsoleHistory({
           historyType: "CONSOLE_OUTPUT",
           content: data["value"],
           language: "python"
         })
       );
     })
     .catch(error => {
       console.error("Error:", error);
     });
    dispatch(resetConsole());
  };
}
