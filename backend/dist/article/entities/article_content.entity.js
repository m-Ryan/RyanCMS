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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArticleContentEntity_1;
const typeorm_1 = require("typeorm");
const userError_1 = require("../../common/filters/userError");
const article_entity_1 = require("./article.entity");
let ArticleContentEntity = ArticleContentEntity_1 = class ArticleContentEntity extends typeorm_1.BaseEntity {
    static updateArticleContent(transactionalEntityManager, articleId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const articleContent = yield ArticleContentEntity_1.findOne({
                where: {
                    article_id: articleId,
                },
            });
            if (!articleContent) {
                throw new userError_1.UserError('文章不存在');
            }
            articleContent.content = content;
            return transactionalEntityManager.save(articleContent);
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ArticleContentEntity.prototype, "article_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'longtext',
        default: '',
    }),
    __metadata("design:type", String)
], ArticleContentEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.OneToOne(type => article_entity_1.ArticleEntity, ArticleEntity => ArticleEntity.content),
    typeorm_1.JoinColumn({ name: 'article_id' }),
    __metadata("design:type", article_entity_1.ArticleEntity)
], ArticleContentEntity.prototype, "article", void 0);
ArticleContentEntity = ArticleContentEntity_1 = __decorate([
    typeorm_1.Entity('article_content')
], ArticleContentEntity);
exports.ArticleContentEntity = ArticleContentEntity;
//# sourceMappingURL=article_content.entity.js.map