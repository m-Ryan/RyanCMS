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
var AlbumEntity_1;
const typeorm_1 = require("typeorm");
const userError_1 = require("../../common/filters/userError");
const user_entity_1 = require("../../user/entities/user.entity");
const photo_entity_1 = require("./photo.entity");
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = __importDefault(require("lodash"));
let AlbumEntity = AlbumEntity_1 = class AlbumEntity extends typeorm_1.BaseEntity {
    static createAlbum(dataDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.UserEntity.findOne({
                user_id: userId,
                deleted_at: 0
            });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            const existAlbum = yield this.checkExist(dataDto.name, userId);
            if (existAlbum) {
                throw new userError_1.UserError('已有同名分类');
            }
            const album = new AlbumEntity_1();
            album.name = dataDto.name;
            album.secret = dataDto.secret;
            album.desc = dataDto.desc;
            album.picture = dataDto.picture;
            album.created_at = dayjs_1.default().unix();
            album.updated_at = dayjs_1.default().unix();
            album.photos = [];
            album.user = user;
            yield album.save();
            return album;
        });
    }
    static updateAlbum(updateAlbumDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, picture, desc, album_id, secret } = updateAlbumDto;
            const existAlbum = yield this.checkExist(name, userId);
            if (existAlbum && existAlbum.album_id !== album_id) {
                throw new userError_1.UserError('已有同名分类');
            }
            const album = yield this.findOne({
                where: {
                    album_id,
                    deleted_at: 0,
                    user_id: userId
                }
            });
            if (!album) {
                throw new userError_1.UserError('相册不存在');
            }
            if (name) {
                album.name = name;
            }
            if (lodash_1.default.isInteger(secret)) {
                album.secret = secret;
            }
            if (picture) {
                album.picture = picture;
            }
            if (desc) {
                album.desc = desc;
            }
            album.updated_at = dayjs_1.default().unix();
            return this.save(album);
        });
    }
    static checkExist(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.findOne({
                where: {
                    name,
                    user_id: userId,
                    deleted_at: 0
                }
            });
            return exist;
        });
    }
    static deleteAlbum(albumId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield this.findOne({
                where: {
                    album_id: albumId,
                    deleted_at: 0,
                    user_id: userId
                },
                relations: ['photos']
            });
            if (!album) {
                throw new userError_1.UserError('分类不存在');
            }
            if (album.photos.length > 0) {
                throw new userError_1.UserError('该相册下文章不为空，不能删除');
            }
            return this.delete(album);
        });
    }
    static getList(page, size, userId, secret, needRelations) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = {
                deleted_at: 0
            };
            if (lodash_1.default.isInteger(secret)) {
                condition.secret = secret;
            }
            const relations = needRelations ? ['photos'] : [];
            if (userId) {
                condition.user_id = userId;
            }
            const result = yield this.findAndCount({
                where: condition,
                skip: (page - 1) * size,
                take: size,
                order: {
                    album_id: 'DESC'
                },
                relations
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
], AlbumEntity.prototype, "album_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], AlbumEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], AlbumEntity.prototype, "desc", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], AlbumEntity.prototype, "picture", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], AlbumEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.UserEntity, (UserEntity) => UserEntity.albums),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], AlbumEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany((type) => photo_entity_1.PhototEntity, (PhototEntity) => PhototEntity.album),
    __metadata("design:type", Array)
], AlbumEntity.prototype, "photos", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], AlbumEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], AlbumEntity.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], AlbumEntity.prototype, "deleted_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], AlbumEntity.prototype, "secret", void 0);
AlbumEntity = AlbumEntity_1 = __decorate([
    typeorm_1.Entity('album')
], AlbumEntity);
exports.AlbumEntity = AlbumEntity;
//# sourceMappingURL=album.entity.js.map