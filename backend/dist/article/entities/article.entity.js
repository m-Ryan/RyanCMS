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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArticleEntity_1;
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const article_content_entity_1 = require("./article_content.entity");
const userError_1 = require("../../common/filters/userError");
const tag_entity_1 = require("../../tag/entities/tag.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const comment_entity_1 = require("../../comment/entities/comment.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const lodash_1 = __importDefault(require("lodash"));
let ArticleEntity = ArticleEntity_1 = class ArticleEntity extends typeorm_1.BaseEntity {
    static createArticle(createArticleDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.UserEntity.findOne({
                user_id: userId
            });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            const tags = yield tag_entity_1.TagEntity.find({
                where: {
                    tag_id: typeorm_1.In(createArticleDto.tags)
                }
            });
            if (tags.length !== createArticleDto.tags.length) {
                throw new userError_1.UserError('所选标签中部分标签不存在');
            }
            return typeorm_1.getConnection().transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                createArticleDto.content = createArticleDto.content.trim();
                createArticleDto.title = createArticleDto.title.trim();
                if (!createArticleDto.title) {
                    throw new userError_1.UserError('标题不能为空');
                }
                if (!createArticleDto.content) {
                    throw new userError_1.UserError('内容不能为空');
                }
                if (!createArticleDto.summary) {
                    throw new userError_1.UserError('摘要不能为空');
                }
                const article = new ArticleEntity_1();
                article.title = createArticleDto.title.trim();
                article.summary = createArticleDto.summary;
                article.secret = createArticleDto.secret;
                article.picture = createArticleDto.picture;
                article.tags = tags;
                article.category_id = createArticleDto.category_id;
                article.user = user;
                article.created_at = dayjs_1.default().unix();
                article.updated_at = dayjs_1.default().unix();
                yield transactionalEntityManager.save(article);
                const content = new article_content_entity_1.ArticleContentEntity();
                content.article_id = article.article_id;
                content.content = createArticleDto.content;
                yield transactionalEntityManager.save(content);
                article.content = content;
                const comment = new comment_entity_1.CommentEntity();
                comment.article_id = article.article_id;
                yield transactionalEntityManager.save(comment);
                return article;
            }));
        });
    }
    static updateArticle(updateArticleDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { article_id, title, content, summary, picture, tags, category_id, secret, level } = updateArticleDto;
            return typeorm_1.getConnection().transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const article = yield this.findOne({
                    where: {
                        article_id,
                        user_id: userId
                    }
                });
                if (!article) {
                    throw new userError_1.UserError('文章不存在');
                }
                if (title) {
                    article.title = title;
                }
                if (summary) {
                    article.summary = summary;
                }
                if (lodash_1.default.isInteger(secret)) {
                    article.secret = secret;
                }
                if (picture) {
                    article.picture = picture;
                }
                if (level) {
                    article.level = level;
                }
                if (tags) {
                    const tagEntitys = yield tag_entity_1.TagEntity.find({
                        where: {
                            tag_id: typeorm_1.In(updateArticleDto.tags),
                            deleted_at: 0
                        }
                    });
                    if (tagEntitys.length !== tags.length) {
                        throw new userError_1.UserError('所选标签中部分标签不存在');
                    }
                    article.tags = tagEntitys;
                }
                if (category_id) {
                    const category = yield category_entity_1.CategoryEntity.findOne({
                        where: {
                            category_id,
                            deleted_at: 0
                        }
                    });
                    if (!category) {
                        throw new userError_1.UserError('所选的分类不存在');
                    }
                    article.category_id = category_id;
                }
                if (content) {
                    yield article_content_entity_1.ArticleContentEntity.updateArticleContent(transactionalEntityManager, article_id, content);
                }
                article.updated_at = dayjs_1.default().unix();
                yield this.save(article);
            }));
        });
    }
    static deleteArticle(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.findOne({
                where: {
                    article_id: articleId,
                    deleted_at: 0,
                    user_id: userId
                }
            });
            if (!article) {
                throw new userError_1.UserError('文章不存在');
            }
            article.deleted_at = dayjs_1.default().unix();
            return this.save(article);
        });
    }
    static getArticle(articleId, userId, title, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = {
                user_id: userId,
                deleted_at: 0
            };
            if (lodash_1.default.isInteger(secret)) {
                condition.secret = secret;
            }
            if (!articleId && !title) {
                throw new userError_1.UserError('文章不存在');
            }
            if (articleId) {
                condition.article_id = articleId;
            }
            if (title) {
                condition.title = title;
            }
            const article = yield this.findOne({
                where: condition,
                relations: ['content', 'tags']
            });
            if (!article) {
                throw new userError_1.UserError('文章不存在');
            }
            article.readcount = article.readcount + 1;
            return this.save(article);
        });
    }
    static getList(page, size, userId, secret, categoryId, tagId, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = {
                deleted_at: 0
            };
            if (lodash_1.default.isInteger(secret)) {
                condition.secret = secret;
            }
            if (userId) {
                condition.user_id = userId;
            }
            if (categoryId) {
                condition.category_id = categoryId;
            }
            const orderColumn = order ? `article.${order}` : 'article.article_id';
            let result = null;
            if (tagId) {
                result = yield this.createQueryBuilder('article')
                    .leftJoinAndSelect('article.tags', 'tag')
                    .leftJoinAndSelect('article.category', 'category')
                    .where(condition)
                    .andWhere('tag.tag_id = :tag_id', { tag_id: tagId })
                    .orderBy({
                    'article.level': 'DESC',
                    [orderColumn]: 'DESC'
                })
                    .take(size)
                    .skip((page - 1) * size)
                    .getManyAndCount();
            }
            else {
                result = yield this.createQueryBuilder('article')
                    .leftJoinAndSelect('article.tags', 'tag')
                    .leftJoinAndSelect('article.category', 'category')
                    .where(condition)
                    .orderBy({
                    'article.level': 'DESC',
                    [orderColumn]: 'DESC'
                })
                    .take(size)
                    .skip((page - 1) * size)
                    .getManyAndCount();
            }
            return {
                list: result[0],
                count: result[1]
            };
        });
    }
    static search(title, page, size, userId, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = {
                title: typeorm_1.Like(`%${title}%`),
                user_id: userId
            };
            if (lodash_1.default.isInteger(secret)) {
                condition.secret = secret;
            }
            const result = yield this.findAndCount({
                where: condition,
                skip: (page - 1) * size,
                take: size,
                order: {
                    article_id: 'DESC'
                },
                relations: ['tags', 'category']
            });
            return {
                list: result[0],
                count: result[1]
            };
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "article_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 40,
        default: ''
    }),
    __metadata("design:type", String)
], ArticleEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: ''
    }),
    __metadata("design:type", String)
], ArticleEntity.prototype, "summary", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: ''
    }),
    __metadata("design:type", String)
], ArticleEntity.prototype, "picture", void 0);
__decorate([
    typeorm_1.Column({
        type: 'smallint',
        default: 1
    }),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "category_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: ''
    }),
    __metadata("design:type", String)
], ArticleEntity.prototype, "origin_source", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "readcount", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'tinyint',
        default: 0
    }),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "secret", void 0);
__decorate([
    typeorm_1.Column({
        type: 'smallint',
        default: 10
    }),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "level", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.UserEntity, (UserEntity) => UserEntity.articles),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ArticleEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "deleted_at", void 0);
__decorate([
    typeorm_1.OneToOne((type) => article_content_entity_1.ArticleContentEntity, (ArticleContentEntity) => ArticleContentEntity.article),
    __metadata("design:type", article_content_entity_1.ArticleContentEntity)
], ArticleEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => category_entity_1.CategoryEntity, (CategoryEntity) => CategoryEntity.category_id),
    typeorm_1.JoinColumn({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], ArticleEntity.prototype, "category", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => tag_entity_1.TagEntity, (TagEntity) => TagEntity.articles),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], ArticleEntity.prototype, "tags", void 0);
ArticleEntity = ArticleEntity_1 = __decorate([
    typeorm_1.Entity('article')
], ArticleEntity);
exports.ArticleEntity = ArticleEntity;
//# sourceMappingURL=article.entity.js.map