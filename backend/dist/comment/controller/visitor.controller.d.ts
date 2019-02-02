import { CommentService } from '../service/comment.service';
export declare class VisitorController {
    private readonly commentService;
    constructor(commentService: CommentService);
    getList(page: number, size: number, commentId: number): Promise<{
        list: import("../entities/message.entity").MessageEntity[];
        count: number;
    }>;
    getComment(articleId?: number, bloggerId?: number): Promise<import("../entities/comment.entity").CommentEntity>;
}
