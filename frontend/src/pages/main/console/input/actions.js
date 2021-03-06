export function consoleHistoryStepBack(consoleCursorDelta) {
  return {
    type: "console/input/MOVE_HISTORY_CURSOR",
    consoleCursorDelta
  };
}

export function updateConsoleText(consoleText) {
  return {
    type: "console/input/UPDATE_TEXT",
    consoleText
  };
}

export function resetConsole() {
  return {
    type: "console/input/RESET"
  };
}
