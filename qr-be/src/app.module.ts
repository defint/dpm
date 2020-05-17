import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { appProviders } from './app.provider';


@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [...appProviders, AppService],
})
export class AppModule {}
