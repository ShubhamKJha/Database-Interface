export default function databaseReducer(state = {}, action) {
  const database = state;
  switch (action.type) {
    case "database/CONNECT_DATABASE": {
      console.log("action", action);
      database.Endpoint = action.database.Endpoint;
      database.UserName = action.database.UserName;
      database.Password = action.database.Password;
      database.Database = action.database.Database;
      database.DatabaseName = action.database.DatabaseName;
      database.connected = "Yes";
      // console.log("new database", state, database);
      return Object.assign({}, state, {
        databaseReducer: database
      });
    }

    case "database/SELECT_DATABASE": {
      const newDatabase = action.data;
      console.log("new database", state, newDatabase);
      return Object.assign({}, state, {
        newDatabase
      });
    }

    case "database/CREATE_DATABASE": {
      return Object.assign({}, state, {
        database: { ...database, databaseName: "test" }
      });
    }

    case "database/CREATE_SCHEMA": {
      console.log(action);
      state.SchemaCreated = true;
      const table = {
        TableName: state.TableName,
        Column: [],
        Rows: []
      };
      action.schema.forEach((value, index, array) => {
        table.Column.push({
          Field: value.Field,
          Type: value.Type,
          PrimaryKey: value.fieldConstraints === "primary_key" ? true : false,
          Null: value.fieldConstraints === "not_null" ? true : false
        });
      });
      state.MySqlSchema.push(table);
      // state.databaseReducer = database;
      return Object.assign({}, state);
    }

    case "database/INSERT_DATA": {
      state["MySqlSchema"].forEach((value, index) => {
        if (value.TableName === state.TableName) {
          console.log(state["MySqlSchema"][index]);
          state["MySqlSchema"][index].Rows.push(action.data);
        }
      });
      return Object.assign({}, state);
    }

    case "database/UPDATE_DATABASE": {
      if (state.DatabaseName === action.data.database)
        state.DatabaseName = action.data.newDatabase;
      return Object.assign({}, state);
    }

    case "database/UPDATE_TABLE": {
      if (state.DatabaseName === action.data.database) {
        state["MySqlSchema"].forEach((value, index) => {
          if (value.TableName === action.data.table) {
            state["MySqlSchema"][index].TableName = action.data.newTable;
          }
        });
      }
      state.TableName = action.data;
      return Object.assign({}, state);
    }

    case "database/UPDATE_COLUMN": {
      if (state.DatabaseName === action.data.database) {
        state["MySqlSchema"].forEach((value, index) => {
          if (value.TableName === action.data.table) {
            state["MySqlSchema"][index].Column.forEach((value, colindex) => {
              state["MySqlSchema"][index].Column[colindex] =
                action.data.newTable;
            });
          }
        });
      }
      return Object.assign({}, state, {
        database: { ...database, schema: [] }
      });
    }

    case "database/UPDATE_ROW": {
      return Object.assign({}, state, {
        database: { ...database, schema: [] }
      });
    }

    case "database/DELETE_DATABASE": {
      return Object.assign({}, state, {
        database: { ...database, schema: [] }
      });
    }

    case "database/DELETE_TABLE": {
      return Object.assign({}, state, {
        database: { ...database, schema: [] }
      });
    }

    case "database/DELETE_COLUMN": {
      return Object.assign({}, state, {
        database: { ...database, schema: [] }
      });
    }

    case "database/DELETE_ROW": {
      return Object.assign({}, state, {
        database: { ...database, schema: [] }
      });
    }

    // case "user/LOGIN_USER": {
    //   const user = [...state.user.slice()];
    //   console.log(user);
    //   console.log("this will be called");
    //   user.Email = action.Email;
    //   user.Password = action.Password;
    //   user.UserName = action.UserName;
    //   return Object.assign({}, state, {
    //     user
    //   });
    // }

    default: {
      return state;
    }
  }
}
