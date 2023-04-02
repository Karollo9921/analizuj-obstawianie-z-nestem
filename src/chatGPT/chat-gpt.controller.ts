import { Controller, Get, Render, Post, Body, Res } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt.service';
import { Throttle } from '@nestjs/throttler';

@Controller('chat-gpt')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @Get()
  @Render('index')
  showMainPage(): { success: boolean } {
    return { success: true };
  }

  @Throttle(1, 15)
  @Post()
  async pushMessageToOpenAI(
    @Body() body: { prompt: string; size: string },
    @Res() res,
  ) {
    try {
      const imageUrl = await this.chatGPTService.pushMessageToOpenAI(body);
      res.status(200).json({
        success: true,
        data: imageUrl,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
  }
}
