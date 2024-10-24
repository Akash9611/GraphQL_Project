const express = require('express');
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type Todo {
            id: ID!,
            todo: String,
            completed: Boolean
            userId: ID
        }
        type Query {
            getTodos: [Todo]
        }
        `,
        resolvers: {
            Query: {
                getTodos: async () => (await axios.get('https://dummyjson.com/todos/random/10')).data
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use('/graphql', expressMiddleware(server));

    app.listen(8000, () => console.log("Server running on port 8000"));
}

startServer();