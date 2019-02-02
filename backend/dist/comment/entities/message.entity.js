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
var MessageEntity_1;
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const userError_1 = require("../../common/filters/userError");
const user_entity_1 = require("../../user/entities/user.entity");
const replace_entity_1 = require("./replace.entity");
const comment_entity_1 = require("./comment.entity");
let MessageEntity = MessageEntity_1 = class MessageEntity extends typeorm_1.BaseEntity {
    static createMessage(createMessageDto, userId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.UserEntity.findOne({
                user_id: userId,
            });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            const message = new MessageEntity_1();
            message.comment_id = comment.comment_id;
            message.content = createMessageDto.content;
            message.user = user;
            message.created_at = dayjs_1.default().unix();
            message.replays = [];
            return this.save(message);
        });
    }
    static createReplay(createReplayDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.findOne({
                message_id: createReplayDto.message_id,
            });
            if (!message) {
                throw new userError_1.UserError('评论楼层不存在');
            }
            return replace_entity_1.ReplayEntity.createReplay(createReplayDto, userId);
        });
    }
    static getList(commentId, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findAndCount({
                where: {
                    deleted_at: 0,
                    comment_id: commentId,
                },
                skip: (page - 1) * size,
                take: size,
                order: {
                    message_id: 'DESC',
                },
                relations: ['replays', 'user'],
            });
            return {
                list: result[0],
                count: result[1],
            };
        });
    }
    static deleteMessage(messageId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.findOne({
                where: {
                    message_id: messageId,
                    user_id: userId,
                    deleted_at: 0,
                },
            });
            if (!message) {
                throw new userError_1.UserError('该评论不存在');
            }
            message.deleted_at = dayjs_1.default().unix();
            return this.save(message);
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MessageEntity.prototype, "message_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], MessageEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], MessageEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], MessageEntity.prototype, "deleted_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], MessageEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, UserEntity => UserEntity.messages),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], MessageEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], MessageEntity.prototype, "comment_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => comment_entity_1.CommentEntity, CommentEntity => CommentEntity.messages),
    typeorm_1.JoinColumn({ name: 'comment_id' }),
    __metadata("design:type", comment_entity_1.CommentEntity)
], MessageEntity.prototype, "comment", void 0);
__decorate([
    typeorm_1.OneToMany(type => replace_entity_1.ReplayEntity, ReplayEntity => ReplayEntity.message),
    __metadata("design:type", Array)
], MessageEntity.prototype, "replays", void 0);
MessageEntity = MessageEntity_1 = __decorate([
    typeorm_1.Entity('message')
], MessageEntity);
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=message.entity.js.map