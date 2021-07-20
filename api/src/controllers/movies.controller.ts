import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Movies} from '../models';
import {MoviesRepository} from '../repositories';

export class MoviesController {
  constructor(
    @repository(MoviesRepository)
    public moviesRepository : MoviesRepository,
  ) {}

  @post('/movies')
  @response(200, {
    description: 'Movies model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movies)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movies, {
            title: 'NewMovies',
            exclude: ['id'],
          }),
        },
      },
    })
    movies: Omit<Movies, 'id'>,
  ): Promise<Movies> {
    return this.moviesRepository.create(movies);
  }

  @get('/movies/count')
  @response(200, {
    description: 'Movies model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Movies) where?: Where<Movies>,
  ): Promise<Count> {
    return this.moviesRepository.count(where);
  }

  @get('/movies')
  @response(200, {
    description: 'Array of Movies model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movies, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Movies) filter?: Filter<Movies>,
  ): Promise<Movies[]> {
    return this.moviesRepository.find(filter);
  }

  @patch('/movies')
  @response(200, {
    description: 'Movies PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movies, {partial: true}),
        },
      },
    })
    movies: Movies,
    @param.where(Movies) where?: Where<Movies>,
  ): Promise<Count> {
    return this.moviesRepository.updateAll(movies, where);
  }

  @get('/movies/{id}')
  @response(200, {
    description: 'Movies model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movies, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Movies, {exclude: 'where'}) filter?: FilterExcludingWhere<Movies>
  ): Promise<Movies> {
    return this.moviesRepository.findById(id, filter);
  }

  @patch('/movies/{id}')
  @response(204, {
    description: 'Movies PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movies, {partial: true}),
        },
      },
    })
    movies: Movies,
  ): Promise<void> {
    await this.moviesRepository.updateById(id, movies);
  }

  @put('/movies/{id}')
  @response(204, {
    description: 'Movies PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() movies: Movies,
  ): Promise<void> {
    await this.moviesRepository.replaceById(id, movies);
  }

  @del('/movies/{id}')
  @response(204, {
    description: 'Movies DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.moviesRepository.deleteById(id);
  }
}
