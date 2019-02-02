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
const typeorm_1 = require("typeorm");
const userError_1 = require("../../common/filters/userError");
const user_entity_1 = require("./user.entity");
let UserPasswordEntity = class UserPasswordEntity extends typeorm_1.BaseEntity {
    static updatePassword(transactionalEntityManager, password, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({
                where: {
                    user_id: userId,
                },
            });
            if (!user) {
                throw new userError_1.UserError('用户不存在');
            }
            user.password = password;
            return transactionalEntityManager.save(user);
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserPasswordEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], UserPasswordEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entity_1.UserEntity, UserEntity => UserEntity.password),
    typeorm_1.JoinColumn({
        name: 'user_id',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserPasswordEntity.prototype, "user", void 0);
UserPasswordEntity = __decorate([
    typeorm_1.Entity('user_password')
], UserPasswordEntity);
exports.UserPasswordEntity = UserPasswordEntity;
//# sourceMappingURL=user_password.entity.js.map