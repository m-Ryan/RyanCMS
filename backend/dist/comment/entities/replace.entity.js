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
var ReplayEntity_1;
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const userError_1 = require("../../common/filters/userError");
const user_entity_1 = require("../../user/entities/user.entity");
const message_entity_1 = require("./message.entity");
let ReplayEntity = ReplayEntity_1 = class ReplayEntity extends typeorm_1.BaseEntity {
    static createReplay(createReplayDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.UserEntity.findOne({
                user_id: userId,
            });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            const replay = new ReplayEntity_1();
            replay.message_id = createReplayDto.message_id;
            replay.content = createReplayDto.content;
            replay.created_at = dayjs_1.default().unix();
            replay.user = user;
            return this.save(replay);
        });
    }
    static deleteReplay(replayId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const replay = yield this.findOne({
                replay_id: replayId,
                user_id: userId,
            });
            if (!replay) {
                throw new userError_1.UserError('该回复不存在');
            }
            return this.delete(replay);
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ReplayEntity.prototype, "replay_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], ReplayEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], ReplayEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], ReplayEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, UserEntity => UserEntity.replays, {
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ReplayEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], ReplayEntity.prototype, "message_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => message_entity_1.MessageEntity, MessageEntity => MessageEntity.replays),
    typeorm_1.JoinColumn({ name: 'message_id' }),
    __metadata("design:type", message_entity_1.MessageEntity)
], ReplayEntity.prototype, "message", void 0);
ReplayEntity = ReplayEntity_1 = __decorate([
    typeorm_1.Entity('replay')
], ReplayEntity);
exports.ReplayEntity = ReplayEntity;
//# sourceMappingURL=replace.entity.js.map