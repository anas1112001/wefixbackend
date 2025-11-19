import { GraphQLScalarType, Kind } from 'graphql';

const GraphQLJSON = new GraphQLScalarType({
  description: 'A JSON object',
  name: 'JSON',
  parseLiteral: (ast) => {
    const parseAst = (ast) => {
      switch (ast.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
          return ast.value;
        case Kind.INT:
        case Kind.FLOAT:
          return parseFloat(ast.value);
        case Kind.OBJECT: {
            const value = Object.create(null);
            ast.fields.forEach(field => {
              value[field.name.value] = parseAst(field.value);
            });
            return value;
          }
        case Kind.LIST:
          return ast.values.map(parseAst);
        case Kind.NULL:
          return null;
        default:
          return null;
      }
    };
    return parseAst(ast);
  },
  parseValue: (value) => value, // value from the client input variables
  serialize: (value) => value, // value sent to the client
});

export { GraphQLJSON };
