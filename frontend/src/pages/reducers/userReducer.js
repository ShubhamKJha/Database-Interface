export default function userReducer(state = {}, action) {
  switch (action.type) {
    case "user/LOGIN_USER": {
      state.Email = action.data.Email;
      state.Password = action.data.Password;
      state.UserName = action.data.UserName;
      return Object.assign({}, state);
    }
    default: {
      return state;
    }
  }
}
