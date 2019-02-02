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
var UserEntity_1;
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const dayjs_1 = __importDefault(require("dayjs"));
const user_password_entity_1 = require("./user_password.entity");
const userError_1 = require("../../common/filters/userError");
const lodash_1 = __importDefault(require("lodash"));
const user_resume_entity_1 = require("./user_resume.entity");
const comment_entity_1 = require("../../comment/entities/comment.entity");
const message_entity_1 = require("../../comment/entities/message.entity");
const replace_entity_1 = require("../../comment/entities/replace.entity");
const article_entity_1 = require("../../article/entities/article.entity");
const user_concat_entity_1 = require("./user_concat.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const tag_entity_1 = require("../../tag/entities/tag.entity");
const key = 'cms_blog';
let UserEntity = UserEntity_1 = class UserEntity extends typeorm_1.BaseEntity {
    static encodePassword(password) {
        return crypto_1.default
            .createHmac('sha256', key)
            .update(password)
            .digest('hex');
    }
    static sign(userId, rank) {
        return jsonwebtoken_1.default.sign({
            user_id: userId,
            rank,
            expiresIn: '7d',
        }, key);
    }
    static verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, key);
        }
        catch (error) {
            throw new userError_1.UserError('无效的token');
        }
    }
    static getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({
                where: {
                    user_id: userId,
                    deleted_at: 0,
                },
            });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            const token = this.sign(user.user_id, user.rank);
            user.token = token;
            user.last_login = dayjs_1.default().unix();
            this.save(user);
            return user;
        });
    }
    static getBaseInfo(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({
                where: {
                    nickname,
                    deleted_at: 0,
                },
            });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            return user;
        });
    }
    static hasRegisterNickname(nickname) {
        return this.count({
            where: {
                nickname,
            },
        });
    }
    static hasRegisterPhone(phone) {
        if (phone) {
            return this.count({
                where: {
                    phone,
                },
            });
        }
    }
    static register(registerDto, userRank) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickname, phone, password } = registerDto;
            const currentTime = dayjs_1.default().unix();
            return typeorm_1.getConnection().transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                if (yield this.hasRegisterNickname(nickname)) {
                    throw new userError_1.UserError('用户名已被注册');
                }
                if (yield this.hasRegisterPhone(phone)) {
                    throw new userError_1.UserError('手机号已被注册');
                }
                const user = new UserEntity_1();
                user.nickname = nickname;
                user.phone = phone;
                user.rank = userRank;
                user.created_at = currentTime;
                user.updated_at = currentTime;
                user.last_login = currentTime;
                yield transactionalEntityManager.save(user);
                const userPassword = new user_password_entity_1.UserPasswordEntity();
                userPassword.user = user;
                userPassword.password = this.encodePassword(password);
                yield transactionalEntityManager.save(userPassword);
                const concat = new user_concat_entity_1.UserConcatEntity();
                concat.user_id = user.user_id;
                yield transactionalEntityManager.save(concat);
                const resume = new user_resume_entity_1.UserResumeEntity();
                resume.user = user;
                yield transactionalEntityManager.save(resume);
                const comment = new comment_entity_1.CommentEntity();
                comment.blogger_id = user.user_id;
                yield transactionalEntityManager.save(comment);
                const category = new category_entity_1.CategoryEntity();
                category.picture =
                    'http://assets.maocanhua.cn/Fi-dy45B8oqzE5_spxwT2nSila14';
                category.desc = '原创';
                category.name = '原创';
                category.user_id = user.user_id;
                category.created_at = currentTime;
                yield transactionalEntityManager.save(category);
                const tag = new tag_entity_1.TagEntity();
                tag.picture = 'http://assets.maocanhua.cn/FlKcAJwVbRx0aGQtZo6Xt2otzTw3';
                tag.desc = '其它';
                tag.name = '其它';
                tag.user_id = user.user_id;
                tag.created_at = currentTime;
                yield transactionalEntityManager.save(tag);
                user.token = this.sign(user.user_id, user.rank);
                user.concat = concat;
                yield transactionalEntityManager.save(user);
                return user;
            }));
        });
    }
    static login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone, password } = loginDto;
            const isExist = yield user_password_entity_1.UserPasswordEntity.findOne({
                where: {
                    phone,
                    password: this.encodePassword(password),
                },
            });
            if (!isExist) {
                throw new userError_1.UserError('密码错误');
            }
            const user = yield this.findOne({
                where: {
                    phone,
                },
            });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            if (user.deleted_at > 0) {
                throw new userError_1.UserError('用户已注销');
            }
            const token = this.sign(user.user_id, user.rank);
            user.token = token;
            user.last_login = dayjs_1.default().unix();
            this.save(user);
            return user;
        });
    }
    static updateUser(updateUserDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickname, phone, password, sex, intro, avatar, github, email, weibo, zhihu, } = updateUserDto;
            const user = yield this.findOne({
                where: {
                    user_id: userId,
                    deleted_at: 0,
                },
            });
            if (!user) {
                throw new userError_1.UserError('没有此用户');
            }
            if (nickname) {
                if (user.nickname !== nickname) {
                    if (yield this.hasRegisterNickname(nickname)) {
                        throw new userError_1.UserError('用户名已被注册');
                    }
                }
                user.nickname = nickname;
            }
            if (phone) {
                if (user.phone !== phone) {
                    if (yield this.hasRegisterPhone(phone)) {
                        throw new userError_1.UserError('手机号已被注册');
                    }
                }
                user.phone = phone;
            }
            if (avatar) {
                user.avatar = avatar;
            }
            if (lodash_1.default.isInteger(sex)) {
                user.sex = sex ? 1 : 0;
            }
            if (lodash_1.default.isString(intro)) {
                user.intro = intro;
            }
            const concat = yield user_concat_entity_1.UserConcatEntity.findOne({
                where: { user_id: userId },
            });
            if (!concat) {
                throw new userError_1.UserError('用户信息有误');
            }
            if (lodash_1.default.isString(zhihu)) {
                concat.zhihu = zhihu;
            }
            if (lodash_1.default.isString(weibo)) {
                concat.weibo = weibo;
            }
            if (lodash_1.default.isString(github)) {
                concat.github = github;
            }
            if (lodash_1.default.isString(email)) {
                concat.email = email;
            }
            return typeorm_1.getConnection().transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                if (password) {
                    if (password.length < 6 || password.length > 36) {
                        throw new userError_1.UserError('密码格式错误');
                    }
                    const userPassword = yield user_password_entity_1.UserPasswordEntity.findOne({
                        where: { user_id: userId },
                    });
                    if (!userPassword) {
                        throw new userError_1.UserError('用户信息有误');
                    }
                    userPassword.password = this.encodePassword(password);
                    yield transactionalEntityManager.save(userPassword);
                }
                yield transactionalEntityManager.save(concat);
                user.token = this.sign(user.user_id, user.rank);
                user.updated_at = dayjs_1.default().unix();
                yield transactionalEntityManager.save(user);
            }));
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 20,
        default: '',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 11,
        default: '',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 200,
        default: 'http://assets.maocanhua.cn/FlYNsz6pq2voMT4z0citFEuFa-lc',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 200,
        default: '',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "intro", void 0);
__decorate([
    typeorm_1.Column({
        type: 'smallint',
        default: 1,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "sex", void 0);
__decorate([
    typeorm_1.Column({
        type: 'smallint',
        default: 1,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "rank", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 40,
        default: 'Ryan',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "theme", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "last_login", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
        select: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "deleted_at", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_password_entity_1.UserPasswordEntity, UserPasswordEntity => UserPasswordEntity.user),
    __metadata("design:type", user_password_entity_1.UserPasswordEntity)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_concat_entity_1.UserConcatEntity, UserConcatEntity => UserConcatEntity.user, { eager: true }),
    __metadata("design:type", user_concat_entity_1.UserConcatEntity)
], UserEntity.prototype, "concat", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_resume_entity_1.UserResumeEntity, UserResumeEntity => UserResumeEntity.user),
    __metadata("design:type", user_resume_entity_1.UserResumeEntity)
], UserEntity.prototype, "resume", void 0);
__decorate([
    typeorm_1.OneToMany(type => message_entity_1.MessageEntity, MessageEntity => MessageEntity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "messages", void 0);
__decorate([
    typeorm_1.OneToMany(type => replace_entity_1.ReplayEntity, ReplayEntity => ReplayEntity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "replays", void 0);
__decorate([
    typeorm_1.OneToMany(type => article_entity_1.ArticleEntity, ArticleEntity => ArticleEntity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "articles", void 0);
UserEntity = UserEntity_1 = __decorate([
    typeorm_1.Entity('user')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map