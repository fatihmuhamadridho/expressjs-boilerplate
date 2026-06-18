import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@common/libs/prisma/client';

function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const user = process.env.DATABASE_USER ?? '';
  const password = process.env.DATABASE_PASSWORD ?? '';
  const host = process.env.DATABASE_HOST ?? '';
  const port = process.env.DATABASE_PORT ?? '';
  const database = process.env.DATABASE_NAME ?? '';

  return `mariadb://${user}:${password}@${host}:${port}/${database}`;
}

export class PrismaService {
  readonly client: PrismaClient;

  constructor() {
    this.client = new PrismaClient({
      adapter: new PrismaMariaDb(getDatabaseUrl()),
    });
  }
}

let prismaService: PrismaService | null = null;

export function getPrismaService(): PrismaService {
  if (!prismaService) {
    prismaService = new PrismaService();
  }

  return prismaService;
}
