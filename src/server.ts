import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express, { Application } from 'express'
import fs from 'fs';
import https from 'https';
import path from 'path';
import { Umzug } from 'umzug'

import uploadRoute from './RESTful/routes/upload'; 
import { User } from './db/models'
import { orm, ORM } from './db/orm'
import { USER_DATA, } from './db/seeds'
import { generateSchema } from './graphql/root/schema'
import { createContext } from './graphql/shared/context'

export class Server {
  private app: express.Application
  private migrator: Umzug
  private orm: ORM
  private port: string | number

  constructor(port: string | undefined, app: Application) {
    this.app = app
    this.port = port ?? 4000

    this.initilizeServer()
  }

  private establishDBConnection() {
    try {
      this.orm = orm
      this.migrator = orm.umzug
      console.log(`🚀DB Connection Established Successfully ...`)
      console.log('---------------------------------------------')
    } catch (error) {
      console.log(`DB ERROR ${error} :(`)
    }
  }

  private async startGraphql() {
    const schema = await generateSchema('targetSchema.graphql')
    const server = new ApolloServer({ context: async (req, res) => await createContext(req, res), schema })
    await server.start()
    server.applyMiddleware({ app: this.app })
  }

  private listen() {
    const isDevelopment = process.env.NODE_ENV !== 'production'
    
    if (isDevelopment) {
      // Use HTTP for development
      this.app.listen(this.port, (): void => {
        console.log('--------------------------------------------------------------')
        console.log(`🚀GraphQL-Server is running on http://localhost:${this.port}/graphql`);
        console.log('--------------------------------------------------------------')
      });
    } else {
      // Use HTTPS for production
      const httpsOptions = {
        cert: fs.readFileSync('domain.crt'),
        key: fs.readFileSync('domain.key')
      };

      https.createServer(httpsOptions, this.app).listen({ port: this.port }, (): void => {
        console.log('--------------------------------------------------------------')
        console.log(`🚀GraphQL-Server is running on https://localhost:${this.port}/graphql`);
        console.log('--------------------------------------------------------------')
      });
    }
  }

  private async seeds() {
    try {
      if (process.env.SEED_ENABLED === 'true') {
        await orm.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await User.sync({ force: true });
        await orm.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        await User.bulkCreate(USER_DATA as any[]);
        console.log('Seed Ended Successfully');
      } else {
        await User.sync();
        console.log('Tables Created Successfully');
      }
    } catch (error) {
      console.log(`Seed Error: ${error}`);
    }
  }


  initilizeServer = async () => {
    this.establishDBConnection()
    this.app.use(express.static(path.join(__dirname, '..', 'public')));
    this.app.use('/upload', uploadRoute);
    await this.startGraphql()
    this.listen()
    await this.seeds()
  }
}

new Server(process?.env.PORT, express())
