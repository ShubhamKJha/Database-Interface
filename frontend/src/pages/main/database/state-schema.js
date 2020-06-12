export const DatabaseSchema = {
  type: "object",
  properties: {
    Endpoint: { type: "string" },
    UserName: { type: "string" },
    Password: { type: "string" },
    Database: { type: "string" },
    DatabaseName: { type: "string" },
    TableName: { type: "string" },
    connected: { type: "string" },
    SchemaCreated: { type: "boolean" },
    MySqlSchema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          TableName: { type: "string" },
          Column: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Field: { type: "string" },
                Type: {
                  type: "string",
                  enum: [
                    "boolean",
                    "int",
                    "float",
                    "real",
                    "datetime",
                    "date",
                    "time",
                    "char",
                    "varchar",
                    "text",
                    "timestamp"
                  ]
                },
                PrimaryKey: { type: "boolean" },
                Null: { type: "boolean" }
              },
              default: {
                Field: "",
                Type: "char",
                PrimaryKey: "false",
                Null: "false"
              }
            },
            default: []
          },
          Rows: {
            type: "array",
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  value: { type: "string" },
                  Type: { type: "string" },
                  Field: { type: "string" }
                },
                default: {}
              },
              additionalProperties: "false",
              default: []
            },
            additionalProperties: "false",
            default: []
          }
        },
        default: {}
      },
      default: []
    },
    PostgreSqlSchema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          TableName: { type: "string" },
          Column: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Field: { type: "string" },
                Type: {
                  type: "string",
                  enum: [
                    "boolean",
                    "int",
                    "float",
                    "real",
                    "datetime",
                    "date",
                    "time",
                    "char",
                    "varchar",
                    "text",
                    "timestamp"
                  ]
                },
                PrimaryKey: { type: "boolean" },
                Null: { type: "boolean" }
              },
              default: {
                Field: "",
                Type: "char",
                PrimaryKey: "false",
                Null: "false"
              }
            },
            default: []
          },
          Rows: {
            type: "array",
            items: {
              type: "array",
              items: {
                type: "string",
                default: ""
              },
              additionalProperties: "false",
              default: []
            },
            additionalProperties: "false",
            default: []
          }
        },
        default: {}
      },
      default: []
    },
    SqliteSchema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          TableName: { type: "string" },
          Column: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Field: { type: "string" },
                Type: {
                  type: "string",
                  enum: [
                    "boolean",
                    "int",
                    "float",
                    "real",
                    "datetime",
                    "date",
                    "time",
                    "char",
                    "varchar",
                    "text",
                    "timestamp"
                  ]
                },
                PrimaryKey: { type: "boolean" },
                Null: { type: "boolean" }
              },
              default: {
                Field: "",
                Type: "char",
                PrimaryKey: "false",
                Null: "false"
              }
            },
            default: []
          },
          Rows: {
            type: "array",
            items: {
              type: "array",
              items: {
                type: "string",
                default: ""
              },
              additionalProperties: "false",
              default: []
            },
            additionalProperties: "false",
            default: []
          }
        },
        default: {}
      },
      default: []
    },
    MongoDBSchema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          TableName: { type: "string" },
          Column: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Field: { type: "string" },
                Type: {
                  type: "string",
                  enum: [
                    "boolean",
                    "int",
                    "float",
                    "real",
                    "datetime",
                    "date",
                    "time",
                    "char",
                    "varchar",
                    "text",
                    "timestamp"
                  ]
                },
                PrimaryKey: { type: "boolean" },
                Null: { type: "boolean" }
              },
              default: {
                Field: "",
                Type: "char",
                PrimaryKey: "false",
                Null: "false"
              }
            },
            default: []
          },
          Rows: {
            type: "array",
            items: {
              type: "array",
              items: {
                type: "string",
                default: ""
              },
              additionalProperties: "false",
              default: []
            },
            additionalProperties: "false",
            default: []
          }
        },
        default: {}
      },
      default: []
    }
  },
  default: {
    Endpoint: "localhost",
    UserName: "root",
    Password: "chinchi789",
    Database: "mysql",
    DatabaseName: "testDatabase",
    connected: "No",
    TableName: "testTable",
    SchemaCreated: false,
    MySqlSchema: [],
    MongoDBSchema: [],
    SqliteSchema: [],
    PostgreSqlSchema: []
  },
  additionalProperties: false
};
