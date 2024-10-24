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
        type User {
            id: ID!,
            username: String,
            firstName: String,
            lastName: String,
            email: String
        }

        type Todo {
            id: ID!,
            todo: String,
            completed: Boolean,
            user: User
        }

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id:ID!): User 
        }
        `,
        resolvers: {
            Todo: {
                user: async (todo) => {
                    return await (await axios.get(`https://dummyjson.com/users/${todo.id}`)).data;
                }
            },

            Query: {
                getTodos: async () => (await axios.get('https://dummyjson.com/todos/random/10')).data, // dummy API urls for getting dummy data
                getAllUsers: async () => (await axios.get('https://dummyjson.com/users')).data.users,
                getUser: async (parent, { id }) => (await axios.get(`https://dummyjson.com/users/${id}`)).data
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