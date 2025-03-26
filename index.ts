import dotenv from 'dotenv';
import { startApolloServer } from "./server";

dotenv.config();

  (async () => {
    await startApolloServer();
  })()