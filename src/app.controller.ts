import { Controller, Get, Res, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  // @Render('index')
  getLogin(@Res() res): object {
    res.status(200);
    return res.redirect('/auth/login');
  }

  @Get('home')
  @Render('index')
  getHello(): object {
    return { success: true };
  }
}
