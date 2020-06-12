export default function userReducer(state = {}, action) {
  switch (action.type) {
    case "user/LOGIN_USER": {
      const userReducer = state;
      userReducer.Email = action.data.Email;
      userReducer.Password = action.data.Password;
      userReducer.UserName = action.data.UserName;
      return Object.assign({}, state, {
        userReducer
      });
    }
    default: {
      return state;
    }
  }
}
