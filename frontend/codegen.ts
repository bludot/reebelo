import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "https://reebelo.floretos.com/graphql",
    documents: ["src/**/*.tsx", "src/**/*.ts"],
    generates: {
        "src/gql/": {
            preset: "client",
            plugins: []
        },

        "./graphql.schema.json": {
            plugins: ["introspection"]
        }
    }
};

export default config;
