import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';
import * as process from 'node:process';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AppLoggerMiddleware } from './middleware/app-logger.middleware';

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  db: string;
}

const dbConfig: DatabaseConfig = {
  host: process.env.MONGO_HOST || '127.0.0.1',
  port: parseInt(process.env.MONGO_PORT || '27017', 10),
  user: process.env.MONGO_USER || 'user',
  password: process.env.MONGO_PASSWORD || 'password',
  db: process.env.MONGO_DB || 'default_db',
};

const mongoUrl = (): string => {
  return `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;
};

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl()),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
