import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const ormConfig = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  logging: true,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_USE_SSL ?? false,
  synchronize: true,
  username: process.env.DB_USER,
}

const secondsPerHour = 60 * 60

export const apolloConfig = {
  cache: {
    loggedOutUserCache: 60 * 5,
    longCache: secondsPerHour * 4,
    microCache: 5,
    miniCache: 15,
    noCache: 0,
    shortCache: 30,
  },
  graphVariant: process.env.APOLLO_GRAPH_VARIANT,
  key: process.env.APOLLO_KEY,

  tracing: process.env.APOLLO_TRACING ?? false,
}
