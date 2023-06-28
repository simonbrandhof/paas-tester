import "reflect-metadata"; // Enable the use of annotations/decorators
import Fastify from "fastify";
import autoload from "@fastify/autoload";
import * as closeWithGrace from "close-with-grace";
import helmet from "@fastify/helmet";
import * as path from "path";
import typeorm from "typeorm-fastify-plugin";
import { User } from "./db/entities/users.entity";
import sensible from "@fastify/sensible";

const envSchema = require("env-schema");

// all the expected environment variables
const confSchema = {
  type: "object",
  required: ["DATABASE_URL", "PORT"],
  properties: {
    PORT: {
      type: "integer"
    },
    DATABASE_URL: { type: "string" },
    NODE_ENV: { type: "string" }
  }
};

// Load and check environment variables
// See https://github.com/fastify/env-schema
envSchema({ schema: confSchema, dotenv: true });

const initialize = async () => {
  const app = Fastify({
    logger: process.env.NODE_ENV === "development"
  });

  await app.register(sensible);
  await app.register(helmet);
  await app.register(typeorm, {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    entities: [User],
    logging: process.env.NODE_ENV === "development" ? "all" : ["warn", "error"],
    // log long queries, without interrupting them
    maxQueryExecutionTime: 1000
  });

  await app.register(autoload, {
    dir: path.join(__dirname, "api"),
    matchFilter: (path) => path.indexOf(".routes.") > 0,
    dirNameRoutePrefix: false
  });

  // delay is the number of milliseconds for the graceful close to finish
  const closeListeners = closeWithGrace({ delay: 500 }, async function({ signal, err, manual }) {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  } as closeWithGrace.CloseWithGraceAsyncCallback);

  app.addHook("onClose", async (instance, done) => {
    closeListeners.uninstall();
    done();
  });

  try {
    await app.ready();
    await app.listen({ port: parseInt(process.env.PORT) });

  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

initialize();
