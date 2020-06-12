import { historySchema } from "../main/console/history/state-schema";
import { consoleInputSchema } from "../main/console/input/state-schema";
import { DatabaseSchema } from "../main/database/state-schema";
// FIXME: break out enums to be in a separate file.
export const stateProperties = {
  consoleInput: consoleInputSchema,
  consoleHistory: historySchema,
  databaseReducer: DatabaseSchema,
  userReducer: {
    type: "object",
    properties: {
      Name: { type: "string" },
      Email: { type: "string" },
      UserName: { type: "string" },
      Password: { type: "string" },
      Database: { type: "object" }
    },
    default: {
      Name: "Database User",
      Email: "",
      UserName: "",
      Password: "",
      Database: ""
    },
    additionalProperties: false
  }
};

export const stateSchema = {
  type: "object",
  properties: stateProperties,
  additionalProperties: false
};
