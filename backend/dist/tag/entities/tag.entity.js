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
var TagEntity_1;
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const article_entity_1 = require("../../article/entities/article.entity");
const userError_1 = require("../../common/filters/userError");
let TagEntity = TagEntity_1 = class TagEntity extends typeorm_1.BaseEntity {
    static checkExist(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existTag = yield this.findOne({
                where: {
                    name,
                    user_id: userId,
                },
            });
            return existTag;
        });
    }
    static createTag(createTagDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, picture, desc } = createTagDto;
            const existTag = yield this.checkExist(name, userId);
            if (existTag) {
                throw new userError_1.UserError('已有同名标签');
            }
            const tag = new TagEntity_1();
            tag.name = name;
            tag.picture = picture;
            tag.desc = desc;
            tag.user_id = userId;
            tag.created_at = dayjs_1.default().unix();
            return this.save(tag);
        });
    }
    static updateTag(updateTagDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, picture, desc, tag_id } = updateTagDto;
            const existTag = yield this.checkExist(name, userId);
            if (existTag && existTag.tag_id !== tag_id) {
                throw new userError_1.UserError('已有同名标签');
            }
            const tag = yield this.findOne({
                where: {
                    tag_id,
                    deleted_at: 0,
                    user_id: userId,
                },
            });
            if (!tag) {
                throw new userError_1.UserError('分类不存在');
            }
            if (name) {
                tag.name = name;
            }
            if (picture) {
                tag.picture = picture;
            }
            if (desc) {
                tag.desc = desc;
            }
            tag.update_at = dayjs_1.default().unix();
            return this.save(tag);
        });
    }
    static deleteTag(tagId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = yield this.findOne({
                where: {
                    tag_id: tagId,
                    deleted_at: 0,
                    user_id: userId,
                },
                relations: ['articles'],
            });
            if (!tag) {
                throw new userError_1.UserError('标签不存在');
            }
            if (tag.articles.length > 0) {
                throw new userError_1.UserError('该标签下文章不为空，不能删除');
            }
            return this.delete(tag);
        });
    }
    static getTag(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = yield this.findOne({
                where: {
                    user_id: userId,
                    name,
                },
            });
            if (!tag) {
                throw new userError_1.UserError('标签不存在');
            }
            return tag;
        });
    }
    static getList(page, size, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findAndCount({
                where: {
                    deleted_at: 0,
                    user_id: userId,
                },
                skip: (page - 1) * size,
                take: size,
                order: {
                    name: 'ASC',
                },
            });
            return {
                list: result[0],
                count: result[1],
            };
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TagEntity.prototype, "tag_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 20,
        default: '',
    }),
    __metadata("design:type", String)
], TagEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], TagEntity.prototype, "picture", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], TagEntity.prototype, "desc", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], TagEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], TagEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], TagEntity.prototype, "update_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], TagEntity.prototype, "deleted_at", void 0);
__decorate([
    typeorm_1.ManyToMany(type => article_entity_1.ArticleEntity, ArticleEntity => ArticleEntity.tags),
    __metadata("design:type", Array)
], TagEntity.prototype, "articles", void 0);
TagEntity = TagEntity_1 = __decorate([
    typeorm_1.Entity('tag')
], TagEntity);
exports.TagEntity = TagEntity;
//# sourceMappingURL=tag.entity.js.map