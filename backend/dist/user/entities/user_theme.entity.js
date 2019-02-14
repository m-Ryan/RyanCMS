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
var UserThemeEntity_1;
const typeorm_1 = require("typeorm");
const userError_1 = require("../../common/filters/userError");
const user_entity_1 = require("./user.entity");
let UserThemeEntity = UserThemeEntity_1 = class UserThemeEntity extends typeorm_1.BaseEntity {
    static updateTheme(userId, updateThemeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const theme = yield this.getTheme(userId);
            if (updateThemeDto.music) {
                theme.music = updateThemeDto.music;
            }
            if (updateThemeDto.color) {
                theme.color = updateThemeDto.color;
            }
            return this.save(theme);
        });
    }
    static getTheme(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const theme = yield UserThemeEntity_1.findOne({
                where: {
                    user_id: userId
                }
            });
            if (!theme) {
                throw new userError_1.UserError('用户不存在');
            }
            return theme;
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserThemeEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], UserThemeEntity.prototype, "music", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], UserThemeEntity.prototype, "color", void 0);
__decorate([
    typeorm_1.OneToOne((type) => user_entity_1.UserEntity, (UserEntity) => UserEntity.theme),
    typeorm_1.JoinColumn({
        name: 'user_id'
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserThemeEntity.prototype, "user", void 0);
UserThemeEntity = UserThemeEntity_1 = __decorate([
    typeorm_1.Entity('user_theme')
], UserThemeEntity);
exports.UserThemeEntity = UserThemeEntity;
//# sourceMappingURL=user_theme.entity.js.map