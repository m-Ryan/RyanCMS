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
var CategoryEntity_1;
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const userError_1 = require("../../common/filters/userError");
const article_entity_1 = require("../../article/entities/article.entity");
let CategoryEntity = CategoryEntity_1 = class CategoryEntity extends typeorm_1.BaseEntity {
    static checkExist(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCategory = yield this.findOne({
                where: {
                    name,
                    user_id: userId,
                },
            });
            return existCategory;
        });
    }
    static createCategory(createCategoryDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, picture, desc } = createCategoryDto;
            const existCategory = yield this.checkExist(name, userId);
            if (existCategory) {
                throw new userError_1.UserError('已有同名分类');
            }
            const category = new CategoryEntity_1();
            category.name = name;
            category.picture = picture;
            category.desc = desc;
            category.user_id = userId;
            category.created_at = dayjs_1.default().unix();
            return this.save(category);
        });
    }
    static updateCategory(updateCategoryDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, picture, desc, category_id } = updateCategoryDto;
            const existCategory = yield this.checkExist(name, userId);
            if (existCategory && existCategory.category_id !== category_id) {
                throw new userError_1.UserError('已有同名分类');
            }
            const category = yield this.findOne({
                where: {
                    category_id,
                    deleted_at: 0,
                    user_id: userId,
                },
                relations: ['articles'],
            });
            if (!category) {
                throw new userError_1.UserError('分类不存在');
            }
            if (category.articles.length > 0) {
                throw new userError_1.UserError('该标签下文章不为空，不能删除');
            }
            if (name) {
                category.name = name;
            }
            if (picture) {
                category.picture = picture;
            }
            if (desc) {
                category.desc = desc;
            }
            category.update_at = dayjs_1.default().unix();
            return this.save(category);
        });
    }
    static deleteCategory(categoryId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.findOne({
                where: {
                    category_id: categoryId,
                    deleted_at: 0,
                    user_id: userId,
                },
            });
            if (!category) {
                throw new userError_1.UserError('分类不存在');
            }
            return this.delete(category);
        });
    }
    static getList(page, size, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = {
                deleted_at: 0,
            };
            if (userId) {
                condition.user_id = userId;
            }
            const result = yield this.findAndCount({
                where: condition,
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
], CategoryEntity.prototype, "category_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 20,
        default: '',
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "picture", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "desc", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "update_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "deleted_at", void 0);
__decorate([
    typeorm_1.OneToMany(type => article_entity_1.ArticleEntity, ArticleEntity => ArticleEntity.category),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "articles", void 0);
CategoryEntity = CategoryEntity_1 = __decorate([
    typeorm_1.Entity('category')
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;
//# sourceMappingURL=category.entity.js.map