import { Controller } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
@Controller('comment/admin')
export class AdminController {
  constructor(private readonly CommentService: CommentService) {}
}
