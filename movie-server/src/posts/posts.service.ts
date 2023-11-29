import { HttpException, Injectable } from '@nestjs/common';
import { PostsEntity } from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


// 定义
export interface PostsRo {
    list: PostsEntity[];
    count: number;
}

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>,
    ) {}

    async create(post: Partial<PostsEntity>): Promise<PostsEntity>{
        const { title } = post;
        if (!title) {
            throw new HttpException('no title', 401);
        }
        // 避免插入重复错误
        const doc = await this.postsRepository.findOne({ where: {title} });
        if (doc) {
            throw new HttpException('article exists', 401)
        }
        // 使用save在库中插入数据记录
        return await this.postsRepository.save(post);
    }

    async findAll(query: any): Promise<PostsRo> {
        const qb = await this.postsRepository.createQueryBuilder('post');
        qb.orderBy('post.create_time', 'DESC');
        const count = await qb.getCount();
        const { pageNum = 1, pageSize = 10, ...params } = query;
        qb.limit(pageSize);
        qb.offset(pageSize * (pageNum - 1));
        const posts = await qb.getMany();
        return { list: posts, count: count };
    }

    async findById(id:number):Promise<PostsEntity> {
        return await this.postsRepository.findOne({ where: { id } });
    }

    async updateById(id:number, post:Partial<PostsEntity>): Promise<PostsEntity> {
        const existPost = await this.postsRepository.findOne({ where: { id } });
        if (!existPost) {
            throw new HttpException(`post of ${id} doesnt exist`, 401);
        }
        // 更新数据记录用merge
        const newPost = this.postsRepository.merge(existPost, post);
        newPost.update_time = new Date();
        return this.postsRepository.save(newPost);
    }

    async remove(id:number) {
        const existPost = await this.postsRepository.findOne({ where: { id } });
        if (!existPost) {
            throw new HttpException(`post of ${id} doesnt exist`, 401);
        }
        return await this.postsRepository.remove(existPost);
    }
}
