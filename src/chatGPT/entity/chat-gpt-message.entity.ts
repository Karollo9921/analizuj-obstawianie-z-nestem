import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SizeEnum } from './size.enum';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';

export type ChatGPTMessageDocument = ChatGPTMessage & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class ChatGPTMessage {
  @Prop()
  @IsString()
  login: string;

  @Prop()
  @IsString()
  @IsEmail()
  email: string;

  @Prop()
  @IsString()
  message: string;

  @Prop()
  @IsEnum(Object.values(SizeEnum))
  size: SizeEnum;

  @Prop()
  @IsBoolean()
  success: boolean;
}

export const ChatGPTMessageSchema =
  SchemaFactory.createForClass(ChatGPTMessage);
