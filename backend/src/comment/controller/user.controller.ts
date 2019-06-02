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
import { UserGuard } from '../../common/guards/user.guard';
import { CreateMessageDto } from '../form/create_message.dto';
import { Auth } from '../../common/interface/Auth';
import { CreateReplayDto } from '../form/create_replay.dto';
import { SuccessResponse } from '../../common/filters/successResponse';
@Controller('comment/user')
export class UserController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(UserGuard)
  @Post('/create-message')
  async createMessage(
    @Body() crateMessageDto: CreateMessageDto,
    @Headers('auth') auth: Auth,
  ) {
    const data = new CreateMessageDto(crateMessageDto);
    await data.validate();
    return this.commentService.createMessage(data, auth.user_id);
  }

  @UseGuards(UserGuard)
  @Post('/create-replay')
  async createReplay(
    @Body() crateReplayDto: CreateReplayDto,
    @Headers('auth') auth: Auth,
  ) {
    const data = new CreateReplayDto(crateReplayDto);
    await data.validate();
    return this.commentService.createReplay(data, auth.user_id);
  }

  @UseGuards(UserGuard)
  @Get('/delete-message')
  async deleteMessage(
    @Query('message_id', new ParseIntPipe()) messageId: number,
    @Headers('auth') auth: Auth,
  ) {
    await this.commentService.deleteMessage(messageId, auth.user_id);
    return SuccessResponse;
  }

  @UseGuards(UserGuard)
  @Get('/delete-replay')
  async deleteReplay(
    @Query('replay_id', new ParseIntPipe()) replayId: number,
    @Headers('auth') auth: Auth,
  ) {
    await this.commentService.deleteReplay(replayId, auth.user_id);
    return SuccessResponse;
  }
}
