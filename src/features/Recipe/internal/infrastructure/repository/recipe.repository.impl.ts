import type { RecipeCommand, RecipeQuery, RecipeRepository } from '../../application/recipe.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class RecipeRepositoryImpl implements RecipeRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/recipes') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
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
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: RecipeCommand) {
    return this.forwardRequest.forward({ method, pathAndQuery, headers: command.headers, body: command.body });
  }
}
