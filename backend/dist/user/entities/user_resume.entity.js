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
Object.defineProperty(exports, "__esModule", { value: true });
var UserResumeEntity_1;
const typeorm_1 = require("typeorm");
const userError_1 = require("../../common/filters/userError");
const user_entity_1 = require("./user.entity");
let UserResumeEntity = UserResumeEntity_1 = class UserResumeEntity extends typeorm_1.BaseEntity {
    static updateResume(userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const resume = yield this.getResume(userId);
            resume.content = content;
            return this.save(resume);
        });
    }
    static getResume(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resume = yield UserResumeEntity_1.findOne({
                where: {
                    user_id: userId,
                },
            });
            if (!resume) {
                throw new userError_1.UserError('用户不存在');
            }
            return resume;
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserResumeEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'longtext',
        default: '',
    }),
    __metadata("design:type", String)
], UserResumeEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entity_1.UserEntity, UserEntity => UserEntity.resume),
    typeorm_1.JoinColumn({
        name: 'user_id',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserResumeEntity.prototype, "user", void 0);
UserResumeEntity = UserResumeEntity_1 = __decorate([
    typeorm_1.Entity('user_resume')
], UserResumeEntity);
exports.UserResumeEntity = UserResumeEntity;
//# sourceMappingURL=user_resume.entity.js.map