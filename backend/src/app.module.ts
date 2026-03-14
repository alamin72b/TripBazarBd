import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceItemModule } from './service-item/service-item.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ServiceItemModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
