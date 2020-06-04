export default function reducer(state, action) {
  const { sampleInput } = state;
  switch (action.type) {
    case "console/input/PRESS_ENTER": {
      return Object.assign({}, state, {
        sampleInput: {
          ...sampleInput,
          enterPressed: true
        }
      });
    }
    case "console/input/INCREMENT": {
      return Object.assign({}, state, {
        sampleInput: {
          ...sampleInput,
          numEnterPressed: state.sampleInput.numEnterPressed + 1
        }
      });
    }
    case "console/input/DECREMENT": {
      return Object.assign({}, state, {
        sampleInput: {
          ...sampleInput,
          numEnterPressed: state.sampleInput.numEnterPressed - 1
        }
      });
    }
    case "console/input/RESET": {
      return Object.assign({}, state, {
        sampleInput: {
          ...sampleInput,
          numEnterPressed: 0
        }
      });
    }
    default:
      return state;
  }
}
