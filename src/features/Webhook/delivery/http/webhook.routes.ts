import express, { type RequestHandler } from 'express';
import type { Resource } from '../../../../delivery/http/routes';
import type { WebhookHandler } from './handler/webhook.handler';

export function createWebhookRoutes(handler: WebhookHandler): RequestHandler {
  const router = express.Router();
  router.post('/create', handler.create);
  router.get('/:identifier/requests/:requestId', handler.getRequest);
  router.delete('/:identifier/requests/:requestId', handler.deleteRequest);
  router.get('/:identifier/requests', handler.listRequests);
  router.get('/:identifier', handler.getWebhook);
  router.post('/:identifier', handler.createWebhook);
  router.put('/:identifier', handler.replaceWebhook);
  router.patch('/:identifier', handler.updateWebhook);
  router.delete('/:identifier', handler.deleteWebhook);
  return router;
}

export function createWebhookResource(handler: WebhookHandler, mountPaths: readonly string[] = ['/webhook']): Resource {
  return {
    name: 'Webhook',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    mountPaths,
    routes: createWebhookRoutes(handler),
  };
}
