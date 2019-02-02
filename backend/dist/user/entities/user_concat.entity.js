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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserConcatEntity = class UserConcatEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserConcatEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entity_1.UserEntity, UserEntity => UserEntity.concat),
    typeorm_1.JoinColumn({
        name: 'user_id',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserConcatEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], UserConcatEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], UserConcatEntity.prototype, "github", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], UserConcatEntity.prototype, "zhihu", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], UserConcatEntity.prototype, "weibo", void 0);
UserConcatEntity = __decorate([
    typeorm_1.Entity('user_concat')
], UserConcatEntity);
exports.UserConcatEntity = UserConcatEntity;
//# sourceMappingURL=user_concat.entity.js.map