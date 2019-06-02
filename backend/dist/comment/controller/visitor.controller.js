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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const comment_service_1 = require("../service/comment.service");
const userError_1 = require("../../common/filters/userError");
let VisitorController = class VisitorController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    getList(page, size, commentId) {
        return this.commentService.getList(page, size, commentId);
    }
    getComment(articleId, bloggerId) {
        if (!articleId && !bloggerId) {
            throw new userError_1.UserError('参数错误');
        }
        return this.commentService.getComment(articleId, bloggerId);
    }
};
__decorate([
    common_1.Get('list'),
    __param(0, common_1.Query('page', new common_1.ParseIntPipe())),
    __param(1, common_1.Query('size', new common_1.ParseIntPipe())),
    __param(2, common_1.Query('comment_id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], VisitorController.prototype, "getList", null);
__decorate([
    common_1.Get('info'),
    __param(0, common_1.Query('article_id')),
    __param(1, common_1.Query('blogger_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], VisitorController.prototype, "getComment", null);
VisitorController = __decorate([
    common_1.Controller('message/visitor'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], VisitorController);
exports.VisitorController = VisitorController;
//# sourceMappingURL=visitor.controller.js.map