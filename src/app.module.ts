import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      { 
        type: 'postgres',
        host: process.env.HOST,
        port: +process.env.PORT,
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [ User ],
        synchronize: true 
      }
    ),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
