import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PostsService, PostsRo} from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService:PostsService) {}

    @Post()
    async create(@Body() post) {
        return await this.postService.create(post);
    }

    @Get()
    async findAll(@Query() query) {
        return await this.postService.findAll(query);
    }

    @Get(":id")
    async findById(@Param('id') id) {
        return await this.postService.findById(Number(id));
    }

    @Put(":id")
    async update(@Param('id') id, @Body() post) {
        return await this.postService.updateById(id, post);
    }

    @Delete(":id")
    async remove(@Param('id') id) {
        return await this.postService.remove(id);
    }
}
