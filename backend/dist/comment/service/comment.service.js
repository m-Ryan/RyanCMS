"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const comment_entity_1 = require("../entities/comment.entity");
let CommentService = class CommentService {
    constructor() { }
    createMessage(createMessageDto, userId) {
        return comment_entity_1.CommentEntity.createMessage(createMessageDto, userId);
    }
    createReplay(createReplayDto, userId) {
        return comment_entity_1.CommentEntity.createReplay(createReplayDto, userId);
    }
    getComment(articleId, bloggerId) {
        return comment_entity_1.CommentEntity.getComment(articleId, bloggerId);
    }
    getList(page, size, commentId) {
        return comment_entity_1.CommentEntity.getList(page, size, commentId);
    }
    deleteMessage(messageId, userId) {
        return comment_entity_1.CommentEntity.deleteMessage(messageId, userId);
    }
    deleteReplay(replayId, userId) {
        return comment_entity_1.CommentEntity.deleteReplay(replayId, userId);
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map