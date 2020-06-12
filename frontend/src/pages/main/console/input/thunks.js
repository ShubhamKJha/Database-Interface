import { resetConsole } from "./actions";
import { addInputToConsole, addToConsoleHistory } from "../history/actions";

const url = "/console/exec";

export function evalConsoleInput(consoleText) {
  return (dispatch, getState) => {
    if (!consoleText) return;

    dispatch(addInputToConsole(consoleText, "python"));

    const token = sessionStorage.getItem("jwt_token");

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
        console.log("data", data);
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
