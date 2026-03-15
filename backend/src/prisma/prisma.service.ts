import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Get your raw MySQL URL
    const rawUrl =
      process.env.DATABASE_URL ||
      'mysql://root:Alamin%23%4059@localhost:3306/tripbazar';

    // 2. The adapter requires the mariadb:// prefix to parse the string correctly
    const mariadbUrl = rawUrl.replace(/^mysql:\/\//, 'mariadb://');

    // 3. Initialize the official adapter
    const adapter = new PrismaMariaDb(mariadbUrl);

    // 4. Inject it into the Prisma Client
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
