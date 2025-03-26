// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
// import bodyParser from 'body-parser';
import getSchema from './src/graphql';
import { getUser } from './src/helpers/getUser';
import { IContextApp } from './src/interfaces/user';

interface MyContext {
  token?: String;
}

export async function startApolloServer() {
  const port = process.env.PORT || 4090;
  const acceptedUrls = process.env.ACCEPTED_URLS?.split(', ');

  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    schema: await getSchema(),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: process.env.NODE_ENV == 'production' ? false : true,
  });

  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>({ origin: acceptedUrls }),
    express.json(),

    expressMiddleware(server, {
      context: async ({ req }): Promise<IContextApp> => {
        // console.log(req.headers);
        const token = req.headers.authorization || '';

        // console.log({token})
        const user = await getUser(token);

        // console.log(user)

        return { user };
      },
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/`);
}
