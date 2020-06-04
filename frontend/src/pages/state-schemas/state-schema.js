import { historySchema } from "../main/console/history/state-schema";
import { consoleInputSchema } from "../main/console/input/state-schema";
import { sampleInputSchema } from "../main/console/sampleinput/state-schema";
// FIXME: break out enums to be in a separate file.
export const stateProperties = {
  sampleInput: sampleInputSchema,
  consoleInput: consoleInputSchema,
  history: historySchema
};

export const stateSchema = {
  type: "object",
  properties: stateProperties,
  additionalProperties: false
};
