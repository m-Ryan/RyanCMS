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
var CommentEntity_1;
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const userError_1 = require("../../common/filters/userError");
const replace_entity_1 = require("./replace.entity");
const message_entity_1 = require("./message.entity");
let CommentEntity = CommentEntity_1 = class CommentEntity extends typeorm_1.BaseEntity {
    static createComment(transactionalEntityManager, article_id, blogger_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = new CommentEntity_1();
            if (article_id) {
                comment.article_id = article_id;
            }
            else {
                comment.article_id = 0;
            }
            if (blogger_id) {
                comment.blogger_id = blogger_id;
            }
            else {
                comment.blogger_id = 0;
            }
            comment.created_at = dayjs_1.default().unix();
            return transactionalEntityManager.save(comment);
        });
    }
    static createMessage(createMessageDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.findOne({
                comment_id: createMessageDto.comment_id,
            });
            if (!comment) {
                throw new userError_1.UserError('留言区id不存在');
            }
            return message_entity_1.MessageEntity.createMessage(createMessageDto, userId, comment);
        });
    }
    static createReplay(createReplayDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return message_entity_1.MessageEntity.createReplay(createReplayDto, userId);
        });
    }
    static getComment(articlId, bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = {};
            if (articlId) {
                condition.article_id = articlId;
            }
            if (bloggerId) {
                condition.blogger_id = bloggerId;
            }
            const comment = yield this.findOne({
                where: condition,
            });
            if (!comment) {
                throw new userError_1.UserError('留言区id不存在');
            }
            return comment;
        });
    }
    static getList(page, size, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.findOne({
                comment_id: commentId,
            });
            if (!comment) {
                throw new userError_1.UserError('留言区id不存在');
            }
            return message_entity_1.MessageEntity.getList(comment.comment_id, page, size);
        });
    }
    static deleteMessage(messageId, userId) {
        return message_entity_1.MessageEntity.deleteMessage(messageId, userId);
    }
    static deleteReplay(replayId, userId) {
        return replace_entity_1.ReplayEntity.deleteReplay(replayId, userId);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CommentEntity.prototype, "comment_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], CommentEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], CommentEntity.prototype, "blogger_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], CommentEntity.prototype, "article_id", void 0);
__decorate([
    typeorm_1.OneToMany(type => message_entity_1.MessageEntity, MessageEntity => MessageEntity.comment),
    __metadata("design:type", Array)
], CommentEntity.prototype, "messages", void 0);
CommentEntity = CommentEntity_1 = __decorate([
    typeorm_1.Entity('comment')
], CommentEntity);
exports.CommentEntity = CommentEntity;
//# sourceMappingURL=comment.entity.js.map