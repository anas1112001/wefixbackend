import { registerEnumType } from 'type-graphql'

export enum Actions {
  IN = 'in',
  OUT = 'out',
  BREAK = 'break',
  LEAVE = 'leave',
  SMOKE_BREAK = 'smoke break',
}

registerEnumType(Actions, { description: 'Log Action types', name: 'Actions' })
