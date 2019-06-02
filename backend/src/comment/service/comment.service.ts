import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../form/create_message.dto';
import { CommentEntity } from '../entities/comment.entity';
import { CreateReplayDto } from '../form/create_replay.dto';
@Injectable()
export class CommentService {
  constructor() {}

  createMessage(createMessageDto: CreateMessageDto, userId: number) {
    return CommentEntity.createMessage(createMessageDto, userId);
  }

  createReplay(createReplayDto: CreateReplayDto, userId: number) {
    return CommentEntity.createReplay(createReplayDto, userId);
  }
  getComment(articleId?: number, bloggerId?: number) {
    return CommentEntity.getComment(articleId, bloggerId);
  }
  getList(page: number, size: number, commentId: number) {
    return CommentEntity.getList(page, size, commentId);
  }

  deleteMessage(messageId: number, userId: number) {
    return CommentEntity.deleteMessage(messageId, userId);
  }

  deleteReplay(replayId: number, userId: number) {
    return CommentEntity.deleteReplay(replayId, userId);
  }
}
