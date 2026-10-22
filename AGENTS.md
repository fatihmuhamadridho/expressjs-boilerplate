# Repository workflow

Follow the global Codex instructions and `RTK.md` from the resolved Codex home.

This service follows the feature-based service layout, adapted to TypeScript. Keep changes consistent across all features.

- Keep feature layers at `domain`, `application`, `delivery`, and `infrastructure`; do not introduce a second `internal` layout.
- Put repository contracts in `domain/repository` and implementations in `infrastructure/repository`.
- Keep each application action in its own `*.usecase.ts`, with an explicit interface and `Execute` method. Feature barrel files only export those actions.
- Keep each HTTP action in its own `*.handler.ts`. Feature handler entrypoints may wire action handlers but must not contain business or transport logic.
- Keep request shapes and request-to-DTO mappers in delivery. Keep external endpoints, HTTP client execution, and configuration in infrastructure.
- Register dependencies and routes in `src/cmd/app/app.ts`; `src/index.ts` only starts the process.
- Put reusable errors in `src/pkg/errs`, HTTP responses in `src/pkg/httpresponse`, and external service implementations in `src/infrastructure/service`. Keep environment configuration in `src/cmd/app/config.ts`.
- Do not introduce a shared catch-all layer, generic handler factories, or generic repository adapters. Each handler shows its use-case call and response handling; each repository scopes its own external-service calls.
- Expose resources directly under `/api`. Provider names belong only in provider configuration, never public paths or feature names.
- Follow the shared JSON response envelope and centralized error handling. Preserve binary responses and bodyless HTTP statuses.
- Keep identifiers validated through their domain value objects.
- Preserve query parameters, bodies, auth headers, and cookies across repository calls.
- Update `docs/api/README.md` when changing endpoints and README migration notes when changing response or configuration contracts.
- Before completion run `rtk pnpm build`, `rtk pnpm lint`, and `rtk pnpm exec prettier src --check`. Verify affected HTTP flows against a controlled upstream when routing or forwarding changes.
