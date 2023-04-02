import { Injectable } from '@nestjs/common';
import { RequestService } from '../request.service';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatGPTMessage } from './entity/chat-gpt-message.entity';

@Injectable()
export class ChatGPTService {
  private readonly configuration: Configuration;
  private openai: OpenAIApi;

  constructor(
    @InjectModel(ChatGPTMessage.name)
    private chatGPTMessageModel: Model<ChatGPTMessage>,
    private readonly requestService: RequestService,
    private readonly configService: ConfigService,
  ) {
    this.configuration = new Configuration({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async pushMessageToOpenAI(body: {
    prompt: string;
    size: string;
  }): Promise<string> {
    const { prompt } = body;
    const user = this.requestService.getUser();

    const imageSize =
      body.size === 'small'
        ? '256x256'
        : body.size === 'medium'
        ? '512x512'
        : '1024x1024';

    const response = await this.openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    if (response) {
      await this.chatGPTMessageModel.create({
        message: prompt,
        size: imageSize,
        email: user.email,
        login: user.login,
        success: true,
      });
    } else {
      await this.chatGPTMessageModel.create({
        message: prompt,
        size: imageSize,
        email: user.email,
        login: user.login,
        success: false,
      });
    }

    return response.data.data[0].url;
  }
}
