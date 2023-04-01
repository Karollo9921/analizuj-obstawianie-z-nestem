import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChatGPTMessageSchema,
  ChatGPTMessage,
} from './entity/chat-gpt-message.entity';
import { AuthenticationMiddleware } from '../middleware/authMiddleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RequestService } from '../request.service';
import { ChatGPTController } from './chat-gpt.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MongooseModule.forFeature([
      {
        name: ChatGPTMessage.name,
        schema: ChatGPTMessageSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_ACCESS_TOKEN'),
        };
      },
    }),
  ],
  controllers: [ChatGPTController],
  providers: [
    ChatGPTService,
    RequestService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [RequestService],
})
export class ChatGPTModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('chat-gpt');
  }
}
