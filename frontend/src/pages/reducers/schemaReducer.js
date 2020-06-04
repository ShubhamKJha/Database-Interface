export default function schemaReducer(state, action) {
  const { schema } = state;
  switch (action.type) {
    case "CREATE_SCHEMA":
      return Object.assign({}, state, {
        schema: action.schema
      });
    case "CHANGE_SCHEMA":
      return Object.assign({}, state, {
        schema: action.schema
      });
    default:
      return state;
  }
}
