import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { MutantsModule } from './modules/mutants/mutants.module';
import { MutantsMiddleware } from './middleware/mutants.middleware';

@Module({
  imports: [
    DatabaseModule,
    MutantsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MutantsMiddleware)
      .forRoutes({ path: 'mutant', method: RequestMethod.POST })
  }
}
