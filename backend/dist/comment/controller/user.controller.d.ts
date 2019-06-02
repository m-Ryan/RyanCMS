import { CommentService } from '../service/comment.service';
import { CreateMessageDto } from '../form/create_message.dto';
import { Auth } from '../../common/interface/Auth';
import { CreateReplayDto } from '../form/create_replay.dto';
export declare class UserController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createMessage(crateMessageDto: CreateMessageDto, auth: Auth): Promise<import("../entities/message.entity").MessageEntity>;
    createReplay(crateReplayDto: CreateReplayDto, auth: Auth): Promise<import("../entities/replace.entity").ReplayEntity>;
    deleteMessage(messageId: number, auth: Auth): Promise<{
        message: string;
        status: number;
    }>;
    deleteReplay(replayId: number, auth: Auth): Promise<{
        message: string;
        status: number;
    }>;
}
