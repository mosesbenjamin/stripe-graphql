import "reflect-metadata";
import {createConnection} from "typeorm";
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import * as session from 'express-session'

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";


const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => ({req})
    });

    await createConnection();
    
    const app = express()

    app.use(
        session({
        secret: "iukugiu",
        resave: false , // wait till there is a change
        saveUninitialized: false // wait and assign a session until we actually have data
    }))
    
    server.applyMiddleware({ app })
    
    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    })
}

startServer()


  