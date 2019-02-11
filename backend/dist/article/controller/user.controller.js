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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const article_service_1 = require("../service/article.service");
const create_article_dto_1 = require("../form/create_article.dto");
const user_guard_1 = require("../../common/guards/user.guard");
const update_article_dto_1 = require("../form/update_article.dto");
const successResponse_1 = require("../../common/filters/successResponse");
const userError_1 = require("../../common/filters/userError");
let UserController = class UserController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    createTag(crateTagDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new create_article_dto_1.CreateArticleDto(crateTagDto);
            yield data.validate();
            return this.articleService.createArticle(data, auth.user_id);
        });
    }
    updateTag(updateTagDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new update_article_dto_1.UpdateArticleDto(updateTagDto);
            yield data.validate();
            yield this.articleService.updateArticle(data, auth.user_id);
            return successResponse_1.SuccessResponse;
        });
    }
    getArticle(title, articleId, auth) {
        if (!articleId && !title) {
            throw new userError_1.UserError('文章不存在');
        }
        return this.articleService.getArticle(auth.user_id, articleId, title);
    }
    getList(page, size, auth, categoryId, secret, tagId, order) {
        return this.articleService.getList(page, size, auth.user_id, secret, categoryId, tagId, order);
    }
    search(title, page, size, auth) {
        return this.articleService.search(title, page, size, auth.user_id);
    }
    deleteArticle(articleId, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.articleService.deleteArticle(articleId, auth.user_id);
            return successResponse_1.SuccessResponse;
        });
    }
};
__decorate([
    common_1.Post('/create-article'),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createTag", null);
__decorate([
    common_1.Post('/update-article'),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_article_dto_1.UpdateArticleDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateTag", null);
__decorate([
    common_1.Get('detail'),
    __param(0, common_1.Query('title')),
    __param(1, common_1.Query('article_id')),
    __param(2, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getArticle", null);
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
], UserController.prototype, "getList", null);
__decorate([
    common_1.Get('search'),
    __param(0, common_1.Query('title')),
    __param(1, common_1.Query('page', new common_1.ParseIntPipe())),
    __param(2, common_1.Query('size', new common_1.ParseIntPipe())),
    __param(3, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "search", null);
__decorate([
    common_1.Get('delete'),
    __param(0, common_1.Query('article_id', new common_1.ParseIntPipe())),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteArticle", null);
UserController = __decorate([
    common_1.Controller('article/user'),
    common_1.UseGuards(user_guard_1.UserGuard),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map