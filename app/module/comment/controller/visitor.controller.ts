import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Next,
  Headers,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { UserError } from '../../../common/filters/userError';
@Controller('message/visitor')
export class VisitorController {
  constructor(private readonly commentService: CommentService) { }

  @Get('list')
  getList(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('size', new ParseIntPipe()) size: number,
    @Query('comment_id', new ParseIntPipe()) commentId: number,
  ) {
    return this.commentService.getList(page, size, commentId);
  }

  @Get('info')
  getComment(
    @Query('article_id') articleId?: number,
    @Query('blogger_id') bloggerId?: number,
  ) {
    if (!articleId && !bloggerId) {
      throw new UserError('参数错误');
    }
    return this.commentService.getComment(articleId, bloggerId);
  }
}
