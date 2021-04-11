import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';

import { AppServerModule } from '../../../letsgetblogging/src/app/app.server.module';
import { join } from 'path';

@Module({
  imports: [AngularUniversalModule.forRoot({
    bootstrap: AppServerModule,
    viewsPath: join(process.cwd(), 'dist/letsgetblogging/browser')
  })]
})
export class AppModule {}
