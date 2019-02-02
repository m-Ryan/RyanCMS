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
const article_service_1 = require("../service/article.service");
const constance_1 = require("../constance");
let VisitorController = class VisitorController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    getList(page, size, userId, categoryId, tagId, order) {
        const secret = constance_1.UN_SECRET_STATUS;
        return this.articleService.getList(page, size, userId, secret, categoryId, tagId, order);
    }
    getArticle(title, articleId, userId) {
        const secret = constance_1.UN_SECRET_STATUS;
        return this.articleService.getArticle(userId, articleId, title, secret);
    }
};
__decorate([
    common_1.Get('list'),
    __param(0, common_1.Query('page', new common_1.ParseIntPipe())),
    __param(1, common_1.Query('size', new common_1.ParseIntPipe())),
    __param(2, common_1.Query('user_id', new common_1.ParseIntPipe())),
    __param(3, common_1.Query('category_id')),
    __param(4, common_1.Query('tag_id')),
    __param(5, common_1.Query('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Number, String]),
    __metadata("design:returntype", void 0)
], VisitorController.prototype, "getList", null);
__decorate([
    common_1.Get('detail'),
    __param(0, common_1.Query('title')),
    __param(1, common_1.Query('article_id')),
    __param(2, common_1.Query('user_id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], VisitorController.prototype, "getArticle", null);
VisitorController = __decorate([
    common_1.Controller('article/visitor'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], VisitorController);
exports.VisitorController = VisitorController;
//# sourceMappingURL=visitor.controller.js.map