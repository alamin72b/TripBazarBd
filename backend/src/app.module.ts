import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceItemModule } from './service-item/service-item.module';

@Module({
  imports: [ServiceItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
