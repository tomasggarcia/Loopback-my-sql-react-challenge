import {Entity, model, property} from '@loopback/repository';

@model()
export class Movies extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    unique: true
  })
  name: string;

  @property({
    type: 'string',
    required: false,
    unique: false
  })
  description: string;

  @property({
    type: 'string',
    required: false,
    unique: false
  })
  date: string;


  constructor(data?: Partial<Movies>) {
    super(data);
  }
}

export interface MoviesRelations {
  // describe navigational properties here
}

export type MoviesWithRelations = Movies & MoviesRelations;
