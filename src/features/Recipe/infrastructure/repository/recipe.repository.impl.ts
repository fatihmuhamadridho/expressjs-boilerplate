import type { RecipeCommand, RecipeQuery, RecipeRepository } from '../../domain/repository/recipe.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class RecipeRepositoryImpl implements RecipeRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/recipes'
  ) {}
  getAll(query: RecipeQuery) {
    return this.get('/', query);
  }
  search(query: RecipeQuery) {
    return this.get('/search', query);
  }
  getTags(query: RecipeQuery) {
    return this.get('/tags', query);
  }
  getByTag(tag: string, query: RecipeQuery) {
    return this.get(`/tag/${encodeURIComponent(tag)}`, query);
  }
  getByMealType(mealType: string, query: RecipeQuery) {
    return this.get(`/meal-type/${encodeURIComponent(mealType)}`, query);
  }
  getById(id: string, query: RecipeQuery) {
    return this.get(`/${encodeURIComponent(id)}`, query);
  }
  add(command: RecipeCommand) {
    return this.send('POST', '/add', command);
  }
  replace(id: string, command: RecipeCommand) {
    return this.send('PUT', `/${encodeURIComponent(id)}`, command);
  }
  update(id: string, command: RecipeCommand) {
    return this.send('PATCH', `/${encodeURIComponent(id)}`, command);
  }
  delete(id: string, command: RecipeCommand) {
    return this.send('DELETE', `/${encodeURIComponent(id)}`, command);
  }

  private get(pathAndQuery: string, query: RecipeQuery) {
    return this.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: RecipeCommand) {
    return this.forward({
      method,
      pathAndQuery: `${pathAndQuery}${command.queryString ?? ''}`,
      headers: command.headers,
      body: command.body,
    });
  }

  private forward(request: ResourceRequest): Promise<ResourceResult> {
    const resourcePath =
      request.pathAndQuery === '/'
        ? ''
        : request.pathAndQuery.startsWith('/?')
          ? request.pathAndQuery.slice(1)
          : request.pathAndQuery;
    return this.gateway.forward({ ...request, pathAndQuery: `${this.basePath}${resourcePath}` });
  }
}
