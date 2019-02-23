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
var NoticeEntity_1;
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const userError_1 = require("../../common/filters/userError");
const notice_read_entity_1 = require("./notice_read.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let NoticeEntity = NoticeEntity_1 = class NoticeEntity extends typeorm_1.BaseEntity {
    static createNotice(createNoticeDto, rank, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notice = new NoticeEntity_1();
            notice.title = createNoticeDto.title;
            notice.content = createNoticeDto.content;
            notice.rank = rank;
            notice.created_at = dayjs_1.default().unix();
            notice.updated_at = dayjs_1.default().unix();
            notice.user_id = userId;
            if (createNoticeDto.type === NoticeType.article) {
                notice.type = createNoticeDto.type;
                notice.link = createNoticeDto.link;
            }
            return notice.save();
        });
    }
    static setNoticeRead(noticeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notice = yield this.findOne({ notice_id: noticeId, deleted_at: 0 });
            if (!notice) {
                throw new userError_1.UserError('通知不存在');
            }
            const noticeRead = yield notice_read_entity_1.NoticeReadEntity.findOne({ notice_id: noticeId, user_id: userId });
            if (!noticeRead) {
                const newNoticeRead = new notice_read_entity_1.NoticeReadEntity();
                newNoticeRead.user_id = userId;
                newNoticeRead.notice_id = noticeId;
                newNoticeRead.created_at = dayjs_1.default().unix();
                newNoticeRead.updated_at = dayjs_1.default().unix();
                yield newNoticeRead.save();
            }
            return;
        });
    }
    static setAllNoticeRead(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.UserEntity.findOne({ user_id: userId, deleted_at: 0 });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            const noticeList = yield this.find({
                deleted_at: 0,
                created_at: typeorm_1.MoreThan(user.created_at)
            });
            const readList = noticeList.map((notice) => ({
                user_id: userId,
                notice_id: notice.notice_id,
                created_at: dayjs_1.default().unix(),
                updated_at: dayjs_1.default().unix()
            }));
            return yield typeorm_1.getConnection().createQueryBuilder().insert().into('notice_read').values(readList).execute();
        });
    }
    static getNewNoticeList(userId, rank) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.UserEntity.findOne({ user_id: userId, deleted_at: 0 });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            const noticeList = yield this.find({
                where: {
                    rank,
                    deleted_at: 0,
                    user_id: typeorm_1.Not(userId),
                    created_at: typeorm_1.MoreThan(user.created_at)
                },
                order: {
                    notice_id: 'DESC'
                }
            });
            const readList = yield notice_read_entity_1.NoticeReadEntity.find({ user_id: userId });
            return noticeList.filter((notice) => !readList.some((read) => read.notice_id === notice.notice_id));
        });
    }
    static deleteNotice(noticeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.UserEntity.findOne({ user_id: userId, deleted_at: 0 });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            const notice = yield this.findOne({ notice_id: noticeId, deleted_at: 0 });
            if (!notice) {
                throw new userError_1.UserError('通知不存在');
            }
            notice.deleted_at = dayjs_1.default().unix();
            return notice.save();
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], NoticeEntity.prototype, "notice_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], NoticeEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], NoticeEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], NoticeEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], NoticeEntity.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], NoticeEntity.prototype, "rank", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], NoticeEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], NoticeEntity.prototype, "link", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], NoticeEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], NoticeEntity.prototype, "deleted_at", void 0);
NoticeEntity = NoticeEntity_1 = __decorate([
    typeorm_1.Entity('notice')
], NoticeEntity);
exports.NoticeEntity = NoticeEntity;
var NoticeType;
(function (NoticeType) {
    NoticeType["article"] = "ARTICLE";
})(NoticeType = exports.NoticeType || (exports.NoticeType = {}));
//# sourceMappingURL=notice.entity.js.map