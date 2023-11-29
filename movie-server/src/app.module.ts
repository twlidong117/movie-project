import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'orm.config';

@Module({
  imports: [TypeOrmModule.forRoot({ ...ormconfig, autoLoadEntities: true }), PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
