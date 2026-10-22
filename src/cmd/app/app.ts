import express, { Request, Response } from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from '../../pkg/httpresponse/error-response';

import type { Resource } from '../../delivery/http/routes';
import { getUpstreamConfig } from './config';
import { UpstreamHttpClient } from '../../infrastructure/service/upstream.service';
import { createProductRoutes } from '../../features/Product/delivery/http/routes';
import { ProductHandler } from '../../features/Product/delivery/http/handler/product.handler';
import { ProductMapper } from '../../features/Product/delivery/http/mapper/product.mapper';
import { ProductRepositoryImpl } from '../../features/Product/infrastructure/repository/product.repository.impl';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetProductDetailUseCase,
  GetProductCategoriesUseCase,
  GetProductCategoryListUseCase,
  GetProductsByCategoryUseCase,
  GetProductListUseCase,
  ReplaceProductUseCase,
  SearchProductsUseCase,
  UpdateProductUseCase,
} from '../../features/Product/application/usecase/product.usecases';
import { createCartRoutes } from '../../features/Cart/delivery/http/routes';
import { CartHandler } from '../../features/Cart/delivery/http/handler/cart.handler';
import { CartMapper } from '../../features/Cart/delivery/http/mapper/cart.mapper';
import { CartRepositoryImpl } from '../../features/Cart/infrastructure/repository/cart.repository.impl';
import {
  GetCartListUseCase,
  GetCartDetailUseCase,
  GetCartByUserIdUseCase,
  CreateCartUseCase,
  ReplaceCartUseCase,
  UpdateCartUseCase,
  DeleteCartUseCase,
} from '../../features/Cart/application/usecase/cart.usecases';
import { createUserResource } from '../../features/User/delivery/http/user.routes';
import { UserHandler } from '../../features/User/delivery/http/handler/user.handler';
import { UserMapper } from '../../features/User/delivery/http/mapper/user.mapper';
import {
  GetUserListUseCase,
  SearchUserUseCase,
  FilterUserUseCase,
  GetUserProfileUseCase,
  GetUserDetailUseCase,
  GetUserCartsUseCase,
  GetUserPostsUseCase,
  GetUserTodosUseCase,
  CreateUserUseCase,
  LoginUserUseCase,
  ReplaceUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../features/User/application/usecase/user.usecases';
import { createPostResource } from '../../features/Post/delivery/http/post.routes';
import { PostHandler } from '../../features/Post/delivery/http/handler/post.handler';
import { PostMapper } from '../../features/Post/delivery/http/mapper/post.mapper';
import {
  GetPostListUseCase,
  SearchPostUseCase,
  GetPostTagListUseCase,
  GetPostTagsUseCase,
  GetPostByTagUseCase,
  GetPostByUserIdUseCase,
  GetPostCommentsUseCase,
  GetPostDetailUseCase,
  CreatePostUseCase,
  ReplacePostUseCase,
  UpdatePostUseCase,
  DeletePostUseCase,
} from '../../features/Post/application/usecase/post.usecases';
import { createCommentResource } from '../../features/Comment/delivery/http/comment.routes';
import { CommentHandler } from '../../features/Comment/delivery/http/handler/comment.handler';
import { CommentMapper } from '../../features/Comment/delivery/http/mapper/comment.mapper';
import {
  GetCommentListUseCase,
  GetCommentDetailUseCase,
  GetCommentByPostIdUseCase,
  CreateCommentUseCase,
  ReplaceCommentUseCase,
  UpdateCommentUseCase,
  DeleteCommentUseCase,
} from '../../features/Comment/application/usecase/comment.usecases';
import { createTodoResource } from '../../features/Todo/delivery/http/todo.routes';
import { TodoHandler } from '../../features/Todo/delivery/http/handler/todo.handler';
import { TodoMapper } from '../../features/Todo/delivery/http/mapper/todo.mapper';
import {
  GetTodoListUseCase,
  GetTodoDetailUseCase,
  GetRandomTodoUseCase,
  GetRandomBatchTodoUseCase,
  GetTodoByUserIdUseCase,
  CreateTodoUseCase,
  ReplaceTodoUseCase,
  UpdateTodoUseCase,
  DeleteTodoUseCase,
} from '../../features/Todo/application/usecase/todo.usecases';
import { createQuoteResource } from '../../features/Quote/delivery/http/quote.routes';
import { QuoteHandler } from '../../features/Quote/delivery/http/handler/quote.handler';
import { QuoteMapper } from '../../features/Quote/delivery/http/mapper/quote.mapper';
import {
  GetQuoteListUseCase,
  GetQuoteDetailUseCase,
  GetRandomQuoteUseCase,
  GetRandomBatchQuoteUseCase,
} from '../../features/Quote/application/usecase/quote.usecases';
import { createRecipeResource } from '../../features/Recipe/delivery/http/recipe.routes';
import { RecipeHandler } from '../../features/Recipe/delivery/http/handler/recipe.handler';
import { RecipeMapper } from '../../features/Recipe/delivery/http/mapper/recipe.mapper';
import {
  GetRecipeListUseCase,
  SearchRecipeUseCase,
  GetRecipeTagsUseCase,
  GetRecipeByTagUseCase,
  GetRecipeByMealTypeUseCase,
  GetRecipeDetailUseCase,
  CreateRecipeUseCase,
  ReplaceRecipeUseCase,
  UpdateRecipeUseCase,
  DeleteRecipeUseCase,
} from '../../features/Recipe/application/usecase/recipe.usecases';
import { createAuthRoutes } from '../../features/Auth/delivery/http/auth.routes';
import { AuthHandler } from '../../features/Auth/delivery/http/handler/auth.handler';
import { AuthMapper } from '../../features/Auth/delivery/http/mapper/auth.mapper';
import { createTestResource } from '../../features/Test/delivery/http/test.routes';
import { TestHandler } from '../../features/Test/delivery/http/handler/test.handler';
import { TestMapper } from '../../features/Test/delivery/http/mapper/test.mapper';
import {
  GetTestUseCase,
  PostTestUseCase,
  PutTestUseCase,
  PatchTestUseCase,
  DeleteTestUseCase,
} from '../../features/Test/application/usecase/test.usecases';
import { createHttpResource } from '../../features/Http/delivery/http/http.routes';
import { HttpHandler } from '../../features/Http/delivery/http/handler/http.handler';
import { HttpMapper } from '../../features/Http/delivery/http/mapper/http.mapper';
import {
  GetHttpStatusUseCase,
  GetHttpStatusMessageUseCase,
} from '../../features/Http/application/usecase/http.usecases';
import { createIpResource } from '../../features/Ip/delivery/http/ip.routes';
import { IpHandler } from '../../features/Ip/delivery/http/handler/ip.handler';
import { IpMapper } from '../../features/Ip/delivery/http/mapper/ip.mapper';
import { LookupIpUseCase } from '../../features/Ip/application/usecase/lookup-ip.usecase';
import { createImageResource } from '../../features/Image/delivery/http/image.routes';
import { ImageHandler } from '../../features/Image/delivery/http/handler/image.handler';
import { ImageMapper } from '../../features/Image/delivery/http/mapper/image.mapper';
import { GenerateImageUseCase } from '../../features/Image/application/usecase/generate-image.usecase';
import { createIconResource } from '../../features/Icon/delivery/http/icon.routes';
import { IconHandler } from '../../features/Icon/delivery/http/handler/icon.handler';
import { IconMapper } from '../../features/Icon/delivery/http/mapper/icon.mapper';
import {
  GetDefaultIconUseCase,
  GetIconByHashUseCase,
  GetIconByHashAndSizeUseCase,
} from '../../features/Icon/application/usecase/icon.usecases';
import { createCustomResponseResource } from '../../features/CustomResponse/delivery/http/custom-response.routes';
import { CustomResponseHandler } from '../../features/CustomResponse/delivery/http/handler/custom-response.handler';
import { CustomResponseMapper } from '../../features/CustomResponse/delivery/http/mapper/custom-response.mapper';
import {
  GenerateCustomResponseUseCase,
  GetCustomResponseByIdentifierUseCase,
} from '../../features/CustomResponse/application/usecase/custom-response.usecases';
import { createTwoFactorResource } from '../../features/TwoFactor/delivery/http/two-factor.routes';
import { TwoFactorHandler } from '../../features/TwoFactor/delivery/http/handler/two-factor.handler';
import { TwoFactorMapper } from '../../features/TwoFactor/delivery/http/mapper/two-factor.mapper';
import {
  GenerateTwoFactorCodeUseCase,
  VerifyTwoFactorCodeUseCase,
} from '../../features/TwoFactor/application/usecase/two-factor.usecases';
import { createWebhookResource } from '../../features/Webhook/delivery/http/webhook.routes';
import { WebhookHandler } from '../../features/Webhook/delivery/http/handler/webhook.handler';
import { WebhookMapper } from '../../features/Webhook/delivery/http/mapper/webhook.mapper';
import {
  CreateWebhookUseCase,
  GetWebhookDetailUseCase,
  CreateNamedWebhookUseCase,
  ReplaceNamedWebhookUseCase,
  UpdateNamedWebhookUseCase,
  DeleteNamedWebhookUseCase,
  ListRequestsWebhookUseCase,
  GetRequestWebhookUseCase,
  DeleteRequestWebhookUseCase,
} from '../../features/Webhook/application/usecase/webhook.usecases';
import { createOpenAPIResource } from '../../features/OpenAPI/delivery/http/openapi.routes';
import { OpenAPIHandler } from '../../features/OpenAPI/delivery/http/handler/open-api.handler';
import { OpenAPIMapper } from '../../features/OpenAPI/delivery/http/mapper/openapi.mapper';
import { GetOpenAPISpecUseCase } from '../../features/OpenAPI/application/usecase/get-open-api-spec.usecase';

import { UserRepositoryImpl } from '../../features/User/infrastructure/repository/user.repository.impl';
import { PostRepositoryImpl } from '../../features/Post/infrastructure/repository/post.repository.impl';
import { CommentRepositoryImpl } from '../../features/Comment/infrastructure/repository/comment.repository.impl';
import { TodoRepositoryImpl } from '../../features/Todo/infrastructure/repository/todo.repository.impl';
import { QuoteRepositoryImpl } from '../../features/Quote/infrastructure/repository/quote.repository.impl';
import { RecipeRepositoryImpl } from '../../features/Recipe/infrastructure/repository/recipe.repository.impl';
import { AuthRepositoryImpl } from '../../features/Auth/infrastructure/repository/auth.repository.impl';
import { TestRepositoryImpl } from '../../features/Test/infrastructure/repository/test.repository.impl';
import { HttpRepositoryImpl } from '../../features/Http/infrastructure/repository/http.repository.impl';
import { IpRepositoryImpl } from '../../features/Ip/infrastructure/repository/ip.repository.impl';
import { ImageRepositoryImpl } from '../../features/Image/infrastructure/repository/image.repository.impl';
import { IconRepositoryImpl } from '../../features/Icon/infrastructure/repository/icon.repository.impl';
import { CustomResponseRepositoryImpl } from '../../features/CustomResponse/infrastructure/repository/custom-response.repository.impl';
import { TwoFactorRepositoryImpl } from '../../features/TwoFactor/infrastructure/repository/two-factor.repository.impl';
import { WebhookRepositoryImpl } from '../../features/Webhook/infrastructure/repository/webhook.repository.impl';
import { OpenAPIRepositoryImpl } from '../../features/OpenAPI/infrastructure/repository/openapi.repository.impl';
import {
  GetCurrentUserUseCase,
  LoginUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
} from '../../features/Auth/application/usecase/auth.usecases';

export function createApp() {
  const app = express();
  const upstreamConfig = getUpstreamConfig();
  const upstreamGateway = new UpstreamHttpClient(upstreamConfig);
  const createProductResource = (
    basePath = '/products',
    mountPaths: readonly string[] = ['/products', '/product']
  ): Resource => {
    const productRepository = new ProductRepositoryImpl(upstreamGateway, basePath);
    const productHandler = new ProductHandler(
      {
        getAll: new GetProductListUseCase(productRepository),
        search: new SearchProductsUseCase(productRepository),
        getById: new GetProductDetailUseCase(productRepository),
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
  const createCartResource = (basePath = '/carts', mountPaths: readonly string[] = ['/carts', '/cart']): Resource => {
    const repository = new CartRepositoryImpl(upstreamGateway, basePath);
    const handler = new CartHandler(
      {
        getAll: new GetCartListUseCase(repository),
        getById: new GetCartDetailUseCase(repository),
        getByUserId: new GetCartByUserIdUseCase(repository),
        add: new CreateCartUseCase(repository),
        replace: new ReplaceCartUseCase(repository),
        update: new UpdateCartUseCase(repository),
        delete: new DeleteCartUseCase(repository),
      },
      new CartMapper()
    );
    return {
      name: 'Cart',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      mountPaths,
      routes: createCartRoutes(handler),
    };
  };
  const createAuthResource = (basePath = '/auth', mountPaths: readonly string[] = ['/auth']): Resource => {
    const repository = new AuthRepositoryImpl(upstreamGateway, basePath);
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
  ): Resource => {
    const repository = new PostRepositoryImpl(upstreamGateway, basePath);
    const handler = new PostHandler(
      {
        getAll: new GetPostListUseCase(repository),
        search: new SearchPostUseCase(repository),
        getTagList: new GetPostTagListUseCase(repository),
        getTags: new GetPostTagsUseCase(repository),
        getByTag: new GetPostByTagUseCase(repository),
        getByUserId: new GetPostByUserIdUseCase(repository),
        getComments: new GetPostCommentsUseCase(repository),
        getById: new GetPostDetailUseCase(repository),
        add: new CreatePostUseCase(repository),
        replace: new ReplacePostUseCase(repository),
        update: new UpdatePostUseCase(repository),
        delete: new DeletePostUseCase(repository),
      },
      new PostMapper()
    );
    return createPostResource(handler, mountPaths);
  };
  const createCommentResourceWithDependencies = (
    basePath = '/comments',
    mountPaths: readonly string[] = ['/comments', '/comment']
  ): Resource => {
    const repository = new CommentRepositoryImpl(upstreamGateway, basePath);
    const handler = new CommentHandler(
      {
        getAll: new GetCommentListUseCase(repository),
        getById: new GetCommentDetailUseCase(repository),
        getByPostId: new GetCommentByPostIdUseCase(repository),
        add: new CreateCommentUseCase(repository),
        replace: new ReplaceCommentUseCase(repository),
        update: new UpdateCommentUseCase(repository),
        delete: new DeleteCommentUseCase(repository),
      },
      new CommentMapper()
    );
    return createCommentResource(handler, mountPaths);
  };
  const createQuoteResourceWithDependencies = (
    basePath = '/quotes',
    mountPaths: readonly string[] = ['/quotes', '/quote']
  ): Resource => {
    const repository = new QuoteRepositoryImpl(upstreamGateway, basePath);
    const handler = new QuoteHandler(
      {
        getAll: new GetQuoteListUseCase(repository),
        getById: new GetQuoteDetailUseCase(repository),
        getRandom: new GetRandomQuoteUseCase(repository),
        getRandomBatch: new GetRandomBatchQuoteUseCase(repository),
      },
      new QuoteMapper()
    );
    return createQuoteResource(handler, mountPaths);
  };
  const createTodoResourceWithDependencies = (
    basePath = '/todos',
    mountPaths: readonly string[] = ['/todos', '/todo']
  ): Resource => {
    const repository = new TodoRepositoryImpl(upstreamGateway, basePath);
    const handler = new TodoHandler(
      {
        getAll: new GetTodoListUseCase(repository),
        getById: new GetTodoDetailUseCase(repository),
        getRandom: new GetRandomTodoUseCase(repository),
        getRandomBatch: new GetRandomBatchTodoUseCase(repository),
        getByUserId: new GetTodoByUserIdUseCase(repository),
        add: new CreateTodoUseCase(repository),
        replace: new ReplaceTodoUseCase(repository),
        update: new UpdateTodoUseCase(repository),
        delete: new DeleteTodoUseCase(repository),
      },
      new TodoMapper()
    );
    return createTodoResource(handler, mountPaths);
  };
  const createRecipeResourceWithDependencies = (
    basePath = '/recipes',
    mountPaths: readonly string[] = ['/recipes', '/recipe']
  ): Resource => {
    const repository = new RecipeRepositoryImpl(upstreamGateway, basePath);
    const handler = new RecipeHandler(
      {
        getAll: new GetRecipeListUseCase(repository),
        search: new SearchRecipeUseCase(repository),
        getTags: new GetRecipeTagsUseCase(repository),
        getByTag: new GetRecipeByTagUseCase(repository),
        getByMealType: new GetRecipeByMealTypeUseCase(repository),
        getById: new GetRecipeDetailUseCase(repository),
        add: new CreateRecipeUseCase(repository),
        replace: new ReplaceRecipeUseCase(repository),
        update: new UpdateRecipeUseCase(repository),
        delete: new DeleteRecipeUseCase(repository),
      },
      new RecipeMapper()
    );
    return createRecipeResource(handler, mountPaths);
  };
  const createUserResourceWithDependencies = (
    basePath = '/users',
    mountPaths: readonly string[] = ['/users', '/user']
  ): Resource => {
    const repository = new UserRepositoryImpl(upstreamGateway, basePath);
    const handler = new UserHandler(
      {
        getAll: new GetUserListUseCase(repository),
        search: new SearchUserUseCase(repository),
        filter: new FilterUserUseCase(repository),
        getCurrentUser: new GetUserProfileUseCase(repository),
        getById: new GetUserDetailUseCase(repository),
        getCarts: new GetUserCartsUseCase(repository),
        getPosts: new GetUserPostsUseCase(repository),
        getTodos: new GetUserTodosUseCase(repository),
        add: new CreateUserUseCase(repository),
        login: new LoginUserUseCase(repository),
        replace: new ReplaceUserUseCase(repository),
        update: new UpdateUserUseCase(repository),
        delete: new DeleteUserUseCase(repository),
      },
      new UserMapper()
    );
    return createUserResource(handler, mountPaths);
  };
  const createHttpResourceWithDependencies = (
    basePath = '/http',
    mountPaths: readonly string[] = ['/http']
  ): Resource => {
    const repository = new HttpRepositoryImpl(upstreamGateway, basePath);
    const handler = new HttpHandler(
      {
        getStatus: new GetHttpStatusUseCase(repository),
        getStatusMessage: new GetHttpStatusMessageUseCase(repository),
      },
      new HttpMapper()
    );
    return createHttpResource(handler, mountPaths);
  };
  const createIpResourceWithDependencies = (basePath = '/ip', mountPaths: readonly string[] = ['/ip']): Resource => {
    const repository = new IpRepositoryImpl(upstreamGateway, basePath);
    const handler = new IpHandler(new LookupIpUseCase(repository), new IpMapper());
    return createIpResource(handler, mountPaths);
  };
  const createOpenAPIResourceWithDependencies = (
    basePath = '/openapi.json',
    mountPaths: readonly string[] = ['/openapi.json']
  ): Resource => {
    const repository = new OpenAPIRepositoryImpl(upstreamGateway, basePath);
    const handler = new OpenAPIHandler(new GetOpenAPISpecUseCase(repository), new OpenAPIMapper());
    return createOpenAPIResource(handler, mountPaths);
  };
  const createCustomResponseResourceWithDependencies = (
    basePath = '/c',
    mountPaths: readonly string[] = ['/c']
  ): Resource => {
    const repository = new CustomResponseRepositoryImpl(upstreamGateway, basePath);
    const handler = new CustomResponseHandler(
      {
        generate: new GenerateCustomResponseUseCase(repository),
        getByIdentifier: new GetCustomResponseByIdentifierUseCase(repository),
      },
      new CustomResponseMapper()
    );
    return createCustomResponseResource(handler, mountPaths);
  };
  const createTwoFactorResourceWithDependencies = (
    basePath = '/2fa',
    mountPaths: readonly string[] = ['/2fa']
  ): Resource => {
    const repository = new TwoFactorRepositoryImpl(upstreamGateway, basePath);
    const handler = new TwoFactorHandler(
      {
        generateCode: new GenerateTwoFactorCodeUseCase(repository),
        verifyCode: new VerifyTwoFactorCodeUseCase(repository),
      },
      new TwoFactorMapper()
    );
    return createTwoFactorResource(handler, mountPaths);
  };
  const createTestResourceWithDependencies = (
    basePath = '/test',
    mountPaths: readonly string[] = ['/test']
  ): Resource => {
    const repository = new TestRepositoryImpl(upstreamGateway, basePath);
    const handler = new TestHandler(
      {
        get: new GetTestUseCase(repository),
        post: new PostTestUseCase(repository),
        put: new PutTestUseCase(repository),
        patch: new PatchTestUseCase(repository),
        delete: new DeleteTestUseCase(repository),
      },
      new TestMapper()
    );
    return createTestResource(handler, mountPaths);
  };
  const createImageResourceWithDependencies = (
    basePath = '/image',
    mountPaths: readonly string[] = ['/image']
  ): Resource => {
    const repository = new ImageRepositoryImpl(upstreamGateway, basePath);
    const handler = new ImageHandler(new GenerateImageUseCase(repository), new ImageMapper());
    return createImageResource(handler, mountPaths);
  };
  const createIconResourceWithDependencies = (
    basePath = '/icon',
    mountPaths: readonly string[] = ['/icon']
  ): Resource => {
    const repository = new IconRepositoryImpl(upstreamGateway, basePath);
    const handler = new IconHandler(
      {
        getDefault: new GetDefaultIconUseCase(repository),
        getByHash: new GetIconByHashUseCase(repository),
        getByHashAndSize: new GetIconByHashAndSizeUseCase(repository),
      },
      new IconMapper()
    );
    return createIconResource(handler, mountPaths);
  };
  const createWebhookResourceWithDependencies = (
    basePath = '/webhook',
    mountPaths: readonly string[] = ['/webhook']
  ): Resource => {
    const repository = new WebhookRepositoryImpl(upstreamGateway, basePath);
    const handler = new WebhookHandler(
      {
        create: new CreateWebhookUseCase(repository),
        getWebhook: new GetWebhookDetailUseCase(repository),
        createWebhook: new CreateNamedWebhookUseCase(repository),
        replaceWebhook: new ReplaceNamedWebhookUseCase(repository),
        updateWebhook: new UpdateNamedWebhookUseCase(repository),
        deleteWebhook: new DeleteNamedWebhookUseCase(repository),
        listRequests: new ListRequestsWebhookUseCase(repository),
        getRequest: new GetRequestWebhookUseCase(repository),
        deleteRequest: new DeleteRequestWebhookUseCase(repository),
      },
      new WebhookMapper()
    );
    return createWebhookResource(handler, mountPaths);
  };
  const resources: Resource[] = [
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
  app.use('/api', express.raw({ type: () => true, limit: upstreamConfig.requestBodyLimit }));
  for (const resource of resources) {
    for (const mountPath of resource.mountPaths) {
      app.use(`/api${mountPath}`, resource.routes);
    }
  }
  app.use(express.json());

  app.get('/', (_req: Request, res: Response) => {
    res.json({
      status: 'success',
      data: { message: 'Service is running' },
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
