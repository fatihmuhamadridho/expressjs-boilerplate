import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import type { DummyJsonResource } from './common/dummyjson/delivery/dummyjson-proxy.runtime';
import { getDummyJsonConfig } from './common/dummyjson/infrastructure/dummyjson.config';
import { DummyJsonHttpClient } from './common/dummyjson/infrastructure/dummyjson.http-client';
import { createProductRoutes } from './features/Product/internal/delivery/http/routes';
import { ProductHandler } from './features/Product/internal/delivery/http/handler/product.handler';
import { ProductMapper } from './features/Product/internal/delivery/http/mapper/product.mapper';
import { ProductRepositoryImpl } from './features/Product/internal/infrastructure/repository/product.repository.impl';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetProductByIDUseCase,
  GetProductCategoriesUseCase,
  GetProductCategoryListUseCase,
  GetProductsByCategoryUseCase,
  GetProductsUseCase,
  ReplaceProductUseCase,
  SearchProductsUseCase,
  UpdateProductUseCase,
} from './features/Product/internal/application/usecase/product.usecases';
import { createCartRoutes } from './features/Cart/internal/delivery/http/routes';
import { CartHandler } from './features/Cart/internal/delivery/http/handler/cart.handler';
import { CartMapper } from './features/Cart/internal/delivery/http/mapper/cart.mapper';
import { CartRepositoryImpl as LayeredCartRepositoryImpl } from './features/Cart/internal/infrastructure/repository/cart.repository.impl';
import { CartUseCase } from './features/Cart/internal/application/usecase/cart.usecases';
import { createUserResource } from './features/DummyJsonUser/internal/delivery/http/user.routes';
import { UserHandler } from './features/DummyJsonUser/internal/delivery/http/handler/user.handler';
import { UserMapper } from './features/DummyJsonUser/internal/delivery/http/mapper/user.mapper';
import { UserUseCases } from './features/DummyJsonUser/internal/application/usecase/user.usecases';
import { createPostResource } from './features/Post/internal/delivery/http/post.routes';
import { PostHandler } from './features/Post/internal/delivery/http/handler/post.handler';
import { PostMapper } from './features/Post/internal/delivery/http/mapper/post.mapper';
import { PostUseCases } from './features/Post/internal/application/usecase/post.usecases';
import { createCommentResource } from './features/Comment/internal/delivery/http/comment.routes';
import { CommentHandler } from './features/Comment/internal/delivery/http/handler/comment.handler';
import { CommentMapper } from './features/Comment/internal/delivery/http/mapper/comment.mapper';
import { CommentUseCases } from './features/Comment/internal/application/usecase/comment.usecases';
import { createTodoResource } from './features/Todo/internal/delivery/http/todo.routes';
import { TodoHandler } from './features/Todo/internal/delivery/http/handler/todo.handler';
import { TodoMapper } from './features/Todo/internal/delivery/http/mapper/todo.mapper';
import { TodoUseCases } from './features/Todo/internal/application/usecase/todo.usecases';
import { createQuoteResource } from './features/Quote/internal/delivery/http/quote.routes';
import { QuoteHandler } from './features/Quote/internal/delivery/http/handler/quote.handler';
import { QuoteMapper } from './features/Quote/internal/delivery/http/mapper/quote.mapper';
import { QuoteUseCases } from './features/Quote/internal/application/usecase/quote.usecases';
import { createRecipeResource } from './features/Recipe/internal/delivery/http/recipe.routes';
import { RecipeHandler } from './features/Recipe/internal/delivery/http/handler/recipe.handler';
import { RecipeMapper } from './features/Recipe/internal/delivery/http/mapper/recipe.mapper';
import { RecipeUseCases } from './features/Recipe/internal/application/usecase/recipe.usecases';
import { createAuthRoutes } from './features/Auth/internal/delivery/http/auth.routes';
import { AuthHandler } from './features/Auth/internal/delivery/http/handler/auth.handler';
import { AuthMapper } from './features/Auth/internal/delivery/http/mapper/auth.mapper';
import { createTestResource } from './features/Test/internal/delivery/http/test.routes';
import { TestHandler } from './features/Test/internal/delivery/http/handler/test.handler';
import { TestMapper } from './features/Test/internal/delivery/http/mapper/test.mapper';
import { TestUseCases } from './features/Test/internal/application/usecase/test.usecases';
import { createHttpResource } from './features/Http/internal/delivery/http/http.routes';
import { HttpHandler } from './features/Http/internal/delivery/http/handler/http.handler';
import { HttpMapper } from './features/Http/internal/delivery/http/mapper/http.mapper';
import { HttpUseCases } from './features/Http/internal/application/usecase/http.usecases';
import { createIpResource } from './features/Ip/internal/delivery/http/ip.routes';
import { IpHandler } from './features/Ip/internal/delivery/http/handler/ip.handler';
import { IpMapper } from './features/Ip/internal/delivery/http/mapper/ip.mapper';
import { LookupIpUseCase } from './features/Ip/internal/application/usecase/lookup-ip.usecase';
import { createImageResource } from './features/Image/internal/delivery/http/image.routes';
import { ImageHandler } from './features/Image/internal/delivery/http/handler/image.handler';
import { ImageMapper } from './features/Image/internal/delivery/http/mapper/image.mapper';
import { GenerateImageUseCase } from './features/Image/internal/application/usecase/generate-image.usecase';
import { createIconResource } from './features/Icon/internal/delivery/http/icon.routes';
import { IconHandler } from './features/Icon/internal/delivery/http/handler/icon.handler';
import { IconMapper } from './features/Icon/internal/delivery/http/mapper/icon.mapper';
import { IconUseCases } from './features/Icon/internal/application/usecase/icon.usecases';
import { createCustomResponseResource } from './features/CustomResponse/internal/delivery/http/custom-response.routes';
import { CustomResponseHandler } from './features/CustomResponse/internal/delivery/http/handler/custom-response.handler';
import { CustomResponseMapper } from './features/CustomResponse/internal/delivery/http/mapper/custom-response.mapper';
import { CustomResponseUseCases } from './features/CustomResponse/internal/application/usecase/custom-response.usecases';
import { createTwoFactorResource } from './features/TwoFactor/internal/delivery/http/two-factor.routes';
import { TwoFactorHandler } from './features/TwoFactor/internal/delivery/http/handler/two-factor.handler';
import { TwoFactorMapper } from './features/TwoFactor/internal/delivery/http/mapper/two-factor.mapper';
import { TwoFactorUseCases } from './features/TwoFactor/internal/application/usecase/two-factor.usecases';
import { createWebhookResource } from './features/Webhook/internal/delivery/http/webhook.routes';
import { WebhookHandler } from './features/Webhook/internal/delivery/http/handler/webhook.handler';
import { WebhookMapper } from './features/Webhook/internal/delivery/http/mapper/webhook.mapper';
import { WebhookUseCases } from './features/Webhook/internal/application/usecase/webhook.usecases';
import { createOpenAPIResource } from './features/OpenAPI/internal/delivery/http/openapi.routes';
import { OpenAPIHandler } from './features/OpenAPI/internal/delivery/http/handler/openapi.handler';
import { OpenAPIMapper } from './features/OpenAPI/internal/delivery/http/mapper/openapi.mapper';
import { GetOpenAPISpecUseCase } from './features/OpenAPI/internal/application/usecase/get-openapi-spec.usecase';

import { DummyJsonUserRepositoryImpl } from './features/DummyJsonUser/internal/infrastructure/repository/user.repository.impl';
import { PostRepositoryImpl } from './features/Post/internal/infrastructure/repository/post.repository.impl';
import { CommentRepositoryImpl } from './features/Comment/internal/infrastructure/repository/comment.repository.impl';
import { TodoRepositoryImpl } from './features/Todo/internal/infrastructure/repository/todo.repository.impl';
import { QuoteRepositoryImpl } from './features/Quote/internal/infrastructure/repository/quote.repository.impl';
import { RecipeRepositoryImpl } from './features/Recipe/internal/infrastructure/repository/recipe.repository.impl';
import { AuthRepositoryImpl } from './features/Auth/internal/infrastructure/repository/auth.repository.impl';
import { TestRepositoryImpl } from './features/Test/internal/infrastructure/repository/test.repository.impl';
import { HttpRepositoryImpl } from './features/Http/internal/infrastructure/repository/http.repository.impl';
import { IpRepositoryImpl } from './features/Ip/internal/infrastructure/repository/ip.repository.impl';
import { ImageRepositoryImpl } from './features/Image/internal/infrastructure/repository/image.repository.impl';
import { IconRepositoryImpl } from './features/Icon/internal/infrastructure/repository/icon.repository.impl';
import { CustomResponseRepositoryImpl } from './features/CustomResponse/internal/infrastructure/repository/custom-response.repository.impl';
import { TwoFactorRepositoryImpl } from './features/TwoFactor/internal/infrastructure/repository/two-factor.repository.impl';
import { WebhookRepositoryImpl } from './features/Webhook/internal/infrastructure/repository/webhook.repository.impl';
import { OpenAPIRepositoryImpl } from './features/OpenAPI/internal/infrastructure/repository/openapi.repository.impl';
import {
  GetCurrentUserUseCase,
  LoginUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
} from './features/Auth/internal/application/usecase/auth.usecases';

dotenv.config();

const app = express();
const dummyJsonConfig = getDummyJsonConfig();
const dummyJsonGateway = new DummyJsonHttpClient(dummyJsonConfig);
const createProductResource = (
  basePath = '/products',
  mountPaths: readonly string[] = ['/products', '/product']
): DummyJsonResource => {
  const productRepository = new ProductRepositoryImpl(dummyJsonGateway, basePath);
  const productHandler = new ProductHandler(
    {
      getAll: new GetProductsUseCase(productRepository),
      search: new SearchProductsUseCase(productRepository),
      getById: new GetProductByIDUseCase(productRepository),
      getCategoryList: new GetProductCategoryListUseCase(productRepository),
      getCategories: new GetProductCategoriesUseCase(productRepository),
      getByCategory: new GetProductsByCategoryUseCase(productRepository),
      add: new CreateProductUseCase(productRepository),
      replace: new ReplaceProductUseCase(productRepository),
      update: new UpdateProductUseCase(productRepository),
      delete: new DeleteProductUseCase(productRepository),
    },
    new ProductMapper()
  );
  return {
    name: 'Product',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    mountPaths,
    routes: createProductRoutes(productHandler),
  };
};
const createCartResource = (
  basePath = '/carts',
  mountPaths: readonly string[] = ['/carts', '/cart']
): DummyJsonResource => {
  const repository = new LayeredCartRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new CartHandler(new CartUseCase(repository), new CartMapper());
  return {
    name: 'Cart',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    mountPaths,
    routes: createCartRoutes(handler),
  };
};
const createAuthResource = (basePath = '/auth', mountPaths: readonly string[] = ['/auth']): DummyJsonResource => {
  const repository = new AuthRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new AuthHandler(
    {
      login: new LoginUseCase(repository),
      logout: new LogoutUseCase(repository),
      refresh: new RefreshTokenUseCase(repository),
      getCurrentUser: new GetCurrentUserUseCase(repository),
    },
    new AuthMapper()
  );
  return {
    name: 'Auth',
    methods: ['GET', 'POST'],
    mountPaths,
    routes: createAuthRoutes(handler),
  };
};
const createPostResourceWithDependencies = (
  basePath = '/posts',
  mountPaths: readonly string[] = ['/posts', '/post']
): DummyJsonResource => {
  const repository = new PostRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new PostHandler(new PostUseCases(repository), new PostMapper());
  return createPostResource(handler, mountPaths);
};
const createCommentResourceWithDependencies = (
  basePath = '/comments',
  mountPaths: readonly string[] = ['/comments', '/comment']
): DummyJsonResource => {
  const repository = new CommentRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new CommentHandler(new CommentUseCases(repository), new CommentMapper());
  return createCommentResource(handler, mountPaths);
};
const createQuoteResourceWithDependencies = (
  basePath = '/quotes',
  mountPaths: readonly string[] = ['/quotes', '/quote']
): DummyJsonResource => {
  const repository = new QuoteRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new QuoteHandler(new QuoteUseCases(repository), new QuoteMapper());
  return createQuoteResource(handler, mountPaths);
};
const createTodoResourceWithDependencies = (
  basePath = '/todos',
  mountPaths: readonly string[] = ['/todos', '/todo']
): DummyJsonResource => {
  const repository = new TodoRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new TodoHandler(new TodoUseCases(repository), new TodoMapper());
  return createTodoResource(handler, mountPaths);
};
const createRecipeResourceWithDependencies = (
  basePath = '/recipes',
  mountPaths: readonly string[] = ['/recipes', '/recipe']
): DummyJsonResource => {
  const repository = new RecipeRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new RecipeHandler(new RecipeUseCases(repository), new RecipeMapper());
  return createRecipeResource(handler, mountPaths);
};
const createUserResourceWithDependencies = (
  basePath = '/users',
  mountPaths: readonly string[] = ['/users', '/user']
): DummyJsonResource => {
  const repository = new DummyJsonUserRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new UserHandler(new UserUseCases(repository), new UserMapper());
  return createUserResource(handler, mountPaths);
};
const createHttpResourceWithDependencies = (
  basePath = '/http',
  mountPaths: readonly string[] = ['/http']
): DummyJsonResource => {
  const repository = new HttpRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new HttpHandler(new HttpUseCases(repository), new HttpMapper());
  return createHttpResource(handler, mountPaths);
};
const createIpResourceWithDependencies = (
  basePath = '/ip',
  mountPaths: readonly string[] = ['/ip']
): DummyJsonResource => {
  const repository = new IpRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new IpHandler(new LookupIpUseCase(repository), new IpMapper());
  return createIpResource(handler, mountPaths);
};
const createOpenAPIResourceWithDependencies = (
  basePath = '/openapi.json',
  mountPaths: readonly string[] = ['/openapi.json']
): DummyJsonResource => {
  const repository = new OpenAPIRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new OpenAPIHandler(new GetOpenAPISpecUseCase(repository), new OpenAPIMapper());
  return createOpenAPIResource(handler, mountPaths);
};
const createCustomResponseResourceWithDependencies = (
  basePath = '/c',
  mountPaths: readonly string[] = ['/c']
): DummyJsonResource => {
  const repository = new CustomResponseRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new CustomResponseHandler(new CustomResponseUseCases(repository), new CustomResponseMapper());
  return createCustomResponseResource(handler, mountPaths);
};
const createTwoFactorResourceWithDependencies = (
  basePath = '/2fa',
  mountPaths: readonly string[] = ['/2fa']
): DummyJsonResource => {
  const repository = new TwoFactorRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new TwoFactorHandler(new TwoFactorUseCases(repository), new TwoFactorMapper());
  return createTwoFactorResource(handler, mountPaths);
};
const createTestResourceWithDependencies = (
  basePath = '/test',
  mountPaths: readonly string[] = ['/test']
): DummyJsonResource => {
  const repository = new TestRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new TestHandler(new TestUseCases(repository), new TestMapper());
  return createTestResource(handler, mountPaths);
};
const createImageResourceWithDependencies = (
  basePath = '/image',
  mountPaths: readonly string[] = ['/image']
): DummyJsonResource => {
  const repository = new ImageRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new ImageHandler(new GenerateImageUseCase(repository), new ImageMapper());
  return createImageResource(handler, mountPaths);
};
const createIconResourceWithDependencies = (
  basePath = '/icon',
  mountPaths: readonly string[] = ['/icon']
): DummyJsonResource => {
  const repository = new IconRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new IconHandler(new IconUseCases(repository), new IconMapper());
  return createIconResource(handler, mountPaths);
};
const createWebhookResourceWithDependencies = (
  basePath = '/webhook',
  mountPaths: readonly string[] = ['/webhook']
): DummyJsonResource => {
  const repository = new WebhookRepositoryImpl(dummyJsonGateway, basePath);
  const handler = new WebhookHandler(new WebhookUseCases(repository), new WebhookMapper());
  return createWebhookResource(handler, mountPaths);
};
const resources: DummyJsonResource[] = [
  createProductResource(),
  createCartResource(),
  createUserResourceWithDependencies(),
  createPostResourceWithDependencies(),
  createCommentResourceWithDependencies(),
  createTodoResourceWithDependencies(),
  createQuoteResourceWithDependencies(),
  createRecipeResourceWithDependencies(),
  createAuthResource(),
  createTestResourceWithDependencies(),
  createHttpResourceWithDependencies(),
  createIpResourceWithDependencies(),
  createImageResourceWithDependencies(),
  createIconResourceWithDependencies(),
  createCustomResponseResourceWithDependencies(),
  createTwoFactorResourceWithDependencies(),
  createWebhookResourceWithDependencies(),
  createOpenAPIResourceWithDependencies(),
  createProductResource('/auth/products', ['/auth/products']),
  createCartResource('/auth/carts', ['/auth/carts']),
  createUserResourceWithDependencies('/auth/users', ['/auth/users']),
  createPostResourceWithDependencies('/auth/posts', ['/auth/posts']),
  createCommentResourceWithDependencies('/auth/comments', ['/auth/comments']),
  createTodoResourceWithDependencies('/auth/todos', ['/auth/todos']),
  createQuoteResourceWithDependencies('/auth/quotes', ['/auth/quotes']),
  createRecipeResourceWithDependencies('/auth/recipes', ['/auth/recipes']),
];

app.use(cors());
app.use('/api/dummyjson', express.raw({ type: () => true, limit: dummyJsonConfig.requestBodyLimit }));
for (const resource of resources) {
  for (const mountPath of resource.mountPaths) {
    app.use(`/api/dummyjson${mountPath}`, resource.routes);
  }
}
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Express + TypeScript jalan asd',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});
