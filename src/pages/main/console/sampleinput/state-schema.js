export const sampleInputSchema = {
  type: "object",
  properties: {
    numEnterPressed: {
      type: "integer"
    },
    enterPressed: {
      type: "boolean"
    }
  },
  default: {
    numEnterPressed: 0,
    enterPressed: false
  },
  additionalProperties: false
};
