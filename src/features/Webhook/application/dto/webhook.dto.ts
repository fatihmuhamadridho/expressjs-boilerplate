import type { ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { WebhookCommand, WebhookQuery } from '../../domain/repository/webhook.repository';

export type WebhookQueryDTO = WebhookQuery;
export type WebhookCommandDTO = WebhookCommand;
export type WebhookResultDTO = ResourceResult;
