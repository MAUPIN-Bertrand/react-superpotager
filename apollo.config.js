module.exports = {
  client: {
    excludes: ["**/generated/**/*"],
    service: {
      name: "schemafile",
      localSchemaFile: "../superpotager-graphql-schema/schema.gql",
    },
  },
};
