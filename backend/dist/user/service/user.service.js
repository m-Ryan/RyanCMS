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
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const user_resume_entity_1 = require("../entities/user_resume.entity");
let UserService = class UserService {
    constructor() { }
    register(registerDto, userRank) {
        return user_entity_1.UserEntity.register(registerDto, userRank);
    }
    getUser(userId) {
        return user_entity_1.UserEntity.getUser(userId);
    }
    getBaseInfo(nickname) {
        return user_entity_1.UserEntity.getBaseInfo(nickname);
    }
    login(loginDto) {
        return user_entity_1.UserEntity.login(loginDto);
    }
    updateUser(updateUserDto, userId) {
        return user_entity_1.UserEntity.updateUser(updateUserDto, userId);
    }
    getResume(userId) {
        return user_resume_entity_1.UserResumeEntity.getResume(userId);
    }
    updateResume(userId, content) {
        return user_resume_entity_1.UserResumeEntity.updateResume(userId, content);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map