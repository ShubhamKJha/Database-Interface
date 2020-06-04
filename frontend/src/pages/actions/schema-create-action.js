export function createSchema(schema) {
  return {
    type: "CREATE_SCHEMA",
    schema
  };
}

export function changeSchema(schema) {
  return {
    type: "CHANGE_SCHEMA",
    schema
  };
}
