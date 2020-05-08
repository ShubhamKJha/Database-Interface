export function addToEvalQueue(chunk) {
  return (dispatch, getState) => {
    dispatch({type: "ADD_TO_EVAL_QUEUE", chunk});
  };
}

export function setKernelState(kernelState) {
  return {
    type: "SET_KERNEL_STATE",
    kernelState
  };
}
