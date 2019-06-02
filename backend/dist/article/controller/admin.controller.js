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
const admin_guard_1 = require("../../common/guards/admin.guard");
let AdminController = class AdminController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    getArticle(title, articleId, auth) {
        const userId = 0;
        return this.articleService.getArticle(userId, articleId, title);
    }
    getList(page, size, auth, categoryId, secret, tagId, order) {
        const userId = 0;
        return this.articleService.getList(page, size, userId, secret, categoryId, tagId, order);
    }
};
__decorate([
    common_1.Get('detail'),
    __param(0, common_1.Query('title')), __param(1, common_1.Query('article_id')), __param(2, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getArticle", null);
__decorate([
    common_1.Get('list'),
    __param(0, common_1.Query('page', new common_1.ParseIntPipe())),
    __param(1, common_1.Query('size', new common_1.ParseIntPipe())),
    __param(2, common_1.Headers('auth')),
    __param(3, common_1.Query('category_id')),
    __param(4, common_1.Query('secret')),
    __param(5, common_1.Query('tag_id')),
    __param(6, common_1.Headers('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Number, Number, Number, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getList", null);
AdminController = __decorate([
    common_1.Controller('article/admin'),
    common_1.UseGuards(admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map