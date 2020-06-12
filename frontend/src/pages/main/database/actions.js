export function connectDatabase(database) {
  return {
    type: "database/CONNECT_DATABASE",
    database
  };
}

export function selectDatabase(database) {
  return {
    type: "dtabase/SELECT_DATABASE",
    database
  };
}

export function createDatabase(databaseName) {
  return {
    type: "database/CREATE_DATABASE",
    databaseName
  };
}

export function createSchema(schema) {
  return {
    type: "database/CREATE_SCHEMA",
    schema
  };
}

export function insertData(data) {
  return {
    type: "database/INSERT_DATA",
    data
  };
}

export function updateDatabase(data) {
  return {
    type: "database/UPDATE_DATABASE",
    data
  };
}

export function updateTable(data) {
  return {
    type: "database/UPDATE_TABLE",
    data
  };
}

export function updateColumn(data) {
  return {
    type: "database/UPDATE_COLUMN",
    data
  };
}

export function updateRow(data) {
  return {
    type: "database/UPDATE_ROW",
    data
  };
}

export function deleteDatabase(data) {
  return {
    type: "database/DELETE_DATABASE",
    data
  };
}

export function deleteTable(data) {
  return {
    type: "database/DELETE_TABLE",
    data
  };
}

export function deleteColumn(data) {
  return {
    type: "database/DELETE_COLUMN",
    data
  };
}

export function deleteRow(data) {
  return {
    type: "database/DELETE_ROW",
    data
  };
}
