# Express.js Boilerplate

Express 5 and TypeScript service with a feature-based architecture.

## Development

Install dependencies with `rtk pnpm install`, copy `.env.example` to `.env`, then run `rtk pnpm dev`.

| Command                              | Purpose                      |
| ------------------------------------ | ---------------------------- |
| `rtk pnpm dev`                       | Watch the process entrypoint |
| `rtk pnpm build`                     | Compile and check TypeScript |
| `rtk pnpm lint`                      | Check coding conventions     |
| `rtk pnpm exec prettier src --check` | Check source formatting      |

`UPSTREAM_API_BASE_URL` selects the external resource service. `UPSTREAM_TIMEOUT_MS` controls the request timeout. `REQUEST_BODY_LIMIT` controls the incoming body limit. The example environment contains the development provider origin; public URLs do not contain the provider name.

## Structure

```text
src/
  index.ts                         # Process startup
  cmd/app/app.ts                   # Dependency construction and route registration
  cmd/app/config.ts                # Environment configuration
  pkg/
    errs/                          # Reusable error types
    httpresponse/                  # Success and error response helpers
    context/                       # Incoming request header context
    httpclient/                    # TypeScript HTTP client contracts
  delivery/http/routes.ts          # Route registration contract
  infrastructure/service/         # External service implementation
  features/<Feature>/
    domain/
      repository/                  # Repository interfaces
      valueobject/                 # Validated identifiers where required
    application/
      dto/                         # Use-case input and output contracts
      usecase/                     # One action and Execute interface per file
    delivery/http/
      handler/                     # One HTTP action per file and feature wiring
      mapper/                      # Request-to-DTO translation
      request/                     # HTTP input shapes
    infrastructure/repository/     # Repository implementations
```

Dependency construction and configuration belong in `cmd/app`; handlers translate requests, invoke `Execute`, and call `pkg/httpresponse` directly. Use cases depend on repository interfaces; each repository owns its upstream resource path and calls the external client directly. Infrastructure owns HTTP execution. Feature handlers that group actions contain wiring only. Barrel files only export action implementations and interfaces. There is no generic handler factory or shared repository adapter.

Reusable errors live in `pkg/errs`, HTTP responses in `pkg/httpresponse`, and HTTP client contracts in `pkg/httpclient`. The HTTP client implementation lives in `infrastructure/service`.

Each feature uses the same `domain`, `application`, `delivery`, and `infrastructure` layers.

## API

Resources mount directly below `/api`, for example `GET /api/products`, `GET /api/products/1`, `POST /api/products/add`, `GET /api/carts`, and `GET /api/users`. Provider-prefixed URLs are no longer registered.

JSON responses use this envelope:

```json
{
  "status": "success",
  "data": { "products": [] },
  "meta": {
    "pagination": {
      "currentPage": 1,
      "perPage": 10,
      "total": 0,
      "totalPages": 0
    }
  }
}
```

Business/input failures use a 4xx status, `status: "fail"`, `error.code`, `error.message`, and `data: null`. Infrastructure failures use a 5xx status and `status: "error"`; technical details are logged rather than returned. Binary responses retain their content type and bytes. Responses with status 204 or 304 have no body.

Migration: update clients to the direct `/api` routes and read JSON payloads from `data`. List pagination now lives in `meta.pagination`. Environment keys changed from provider-specific names to the names documented above.

Full endpoint list: [API documentation](docs/api/README.md).
