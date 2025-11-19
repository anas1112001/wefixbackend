import { ApolloError } from 'apollo-server-express'
import { Query, Resolver } from 'type-graphql'
import { v4 as uuidv4 } from 'uuid'

import { LogResponse } from './LogSchema.schema'
import { Actions } from './typedefs/logEnums'

import { USER_DATA } from '../../../db/seeds/usersSeed'

@Resolver((_of) => LogResponse)
export class LogResolver {
  @Query((_returns) => [LogResponse], {
    description: 'Query for a list of Log',
    nullable: true,
  })
  public async getAllLogs(): Promise<LogResponse[]> {
    try {
      const logs = []
      USER_DATA.forEach((user) => {
        const _user = { ...user, }
        logs.push({
          log: {
            actionType: Actions.IN,
            description: 'i logged in',
            id: uuidv4(),
            isArchived: false,
            time: new Date(2021, 11, 24, 9, 10),
            user: _user,
          },
        })
        logs.push({
          log: {
            actionType: Actions.BREAK,
            description: 'break time!!',
            id: uuidv4(),
            isArchived: false,
            time: new Date(2021, 11, 24, 1, 30),
            user: _user,
          },
        })
      })

      const mockLogs = Promise.resolve(logs)

      return mockLogs
    } catch (error) {
      throw new ApolloError(`${error}`)
    }
  }
}
