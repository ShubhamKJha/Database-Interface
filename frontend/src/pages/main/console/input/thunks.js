import { resetConsole } from "./actions";
import { addInputToConsole, addToConsoleHistory } from "../history/actions";

const url = "/console/exec";

export function evalConsoleInput(consoleText) {
  return (dispatch, getState) => {
    // exit if there is no code in the console to  eval
    console.log(consoleText);
    if (!consoleText) return;
    const chunk = {
      chunkContent: consoleText
    };

    dispatch(addInputToConsole(consoleText, "python"));

    const token = sessionStorage.getItem("jwt_token");
    // console.log("token is", token);

    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ command: consoleText })
    };
    console.log("This is calling");
    fetch(url, init)
      .then(res => res.json())
      .then(data => {
        // data = JSON.parse(data);
        console.log("data", data);
        // dispatch(
        //   addToConsoleHistory({
        //     historyType: "CONSOLE_OUTPUT",
        //     content: data["value"],
        //     language: "python"
        //   })
        // );
      })
      .catch(error => {
        console.error("Error:", error);
      });
    dispatch(resetConsole());
  };
}
