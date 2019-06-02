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
const article_entity_1 = require("../entities/article.entity");
let ArticleService = class ArticleService {
    constructor() { }
    createArticle(createArticleDto, userId) {
        return article_entity_1.ArticleEntity.createArticle(createArticleDto, userId);
    }
    updateArticle(updateArticleDto, userId) {
        return article_entity_1.ArticleEntity.updateArticle(updateArticleDto, userId);
    }
    deleteArticle(articleId, userId) {
        return article_entity_1.ArticleEntity.deleteArticle(articleId, userId);
    }
    getArticle(userId, articleId, title, secret) {
        return article_entity_1.ArticleEntity.getArticle(articleId, userId, title, secret);
    }
    getList(page, size, userId, secret, categoryId, tagId, order) {
        return article_entity_1.ArticleEntity.getList(page, size, userId, secret, categoryId, tagId, order);
    }
    search(title, page, size, userId, secret) {
        return article_entity_1.ArticleEntity.search(title, page, size, userId, secret);
    }
};
ArticleService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map