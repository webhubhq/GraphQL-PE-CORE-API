import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import resolvers from "./schema/resolvers"

import { readFileSync } from 'fs';
import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import gql from 'graphql-tag';

const __dirname = path.resolve(path.dirname(''));

const typeDefs = gql(readFileSync(path.resolve(__dirname, "dist/schema/typeDefs.gql").toString(), 'utf8'));
const schema = makeExecutableSchema({ typeDefs, resolvers });

// server setup
const server = new ApolloServer({
    schema
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        // @ts-ignore
        // console.log('req.body.query: ', req?.body?.query)
        // console.log('req.url: ', req.url);

        return { url: req.url };
    },
});

console.log('url: ', url);
console.log('server ready at port: ', 4000);

/*
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs, resolvers } from './schema';

interface MyContext {
  token?: string;
}

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// Integrated middleware function with query editing
app.use(
  '/',
  cors<cors.CorsRequest>(),
  express.json(),
  (req, res, next) => {
    // Modify the query in the request body (example: add a custom field)
    req.body.query = `
      query {
        modifiedQuery: ${req.body.query}
      }
    `;
    
    console.log('Modified GraphQL Query:', req.body.query);

    // Continue to the next middleware
    next();
  },
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);


*/