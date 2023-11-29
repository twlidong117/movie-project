import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("list")
  getList(): string {
    return 'get list';
  }

  @Post("list")
  postList():string {
    return 'post list';
  }

  @Get("user_*")
  getUser(): string {
    return 'get User';
  }

  @Put("list/:id")
  update(@Param('id') id: number): string {
    return 'update: '+ id;
  }
}
