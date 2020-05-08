export function pressEnter(){
  return {
    type: "console/input/PRESS_ENTER"
  };
}

export function increment(){
  return {
    type: "console/input/INCREMENT"
  };
}

export function decrement(){
  return {
    type: "console/input/DECREMENT"
  };
}

export function reset(){
  return {
    type: "console/input/RESET"
  };
}
