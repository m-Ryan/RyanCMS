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
const typeorm_1 = require("typeorm");
const album_entity_1 = require("./album.entity");
const dayjs_1 = __importDefault(require("dayjs"));
const userError_1 = require("../../common/filters/userError");
let PhototEntity = class PhototEntity extends typeorm_1.BaseEntity {
    static createPhotos(dataDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield album_entity_1.AlbumEntity.findOne({
                user_id: userId,
                name: decodeURIComponent(dataDto.album_name),
                deleted_at: 0
            });
            if (!album) {
                throw new userError_1.UserError('相册不存在');
            }
            const currentTime = dayjs_1.default().unix();
            const currentDay = dayjs_1.default().format('YYYY年-MM月-DD日');
            const urls = dataDto.photos;
            const photos = urls.map((url) => ({
                url,
                album,
                name: currentDay,
                user_id: userId,
                created_at: currentTime,
                updated_at: currentTime
            }));
            return yield typeorm_1.getConnection().createQueryBuilder().insert().into('photo').values(photos).execute();
        });
    }
    static getList(page, size, albumName, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield album_entity_1.AlbumEntity.findOne({
                user_id: userId,
                name: decodeURIComponent(albumName),
                deleted_at: 0
            });
            if (!album) {
                throw new userError_1.UserError('相册不存在');
            }
            const condition = {
                deleted_at: 0,
                album
            };
            if (userId) {
                condition.user_id = userId;
            }
            const result = yield this.findAndCount({
                where: condition,
                skip: (page - 1) * size,
                take: size
            });
            return {
                list: result[0],
                count: result[1]
            };
        });
    }
    static updatePhoto(updatePhotoDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const photo = yield this.findOne({ photo_id: updatePhotoDto.photo_id, deleted_at: 0, user_id: userId });
            if (!photo) {
                throw new userError_1.UserError('相片不存在');
            }
            photo.name = updatePhotoDto.name;
            return photo.save();
        });
    }
    static deletePhotos(photoIds, userId) {
        return this.update({
            photo_id: typeorm_1.In(photoIds),
            user_id: userId,
            deleted_at: 0
        }, {
            deleted_at: dayjs_1.default().unix()
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PhototEntity.prototype, "photo_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], PhototEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], PhototEntity.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], PhototEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], PhototEntity.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], PhototEntity.prototype, "deleted_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], PhototEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => album_entity_1.AlbumEntity, (AlbumEntity) => AlbumEntity.photos),
    __metadata("design:type", Array)
], PhototEntity.prototype, "album", void 0);
PhototEntity = __decorate([
    typeorm_1.Entity('photo')
], PhototEntity);
exports.PhototEntity = PhototEntity;
//# sourceMappingURL=photo.entity.js.map