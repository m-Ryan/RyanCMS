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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const user_guard_1 = require("../../common/guards/user.guard");
const updateUser_dto_1 = require("../form/updateUser.dto");
const successResponse_1 = require("../../common/filters/successResponse");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    update(updateUserDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new updateUser_dto_1.UpdateUserDto(updateUserDto);
            yield data.validate();
            yield this.userService.updateUser(updateUserDto, auth.user_id);
            return successResponse_1.SuccessResponse;
        });
    }
    getUser(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getUser(auth.user_id);
        });
    }
    getResume(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getResume(auth.user_id);
        });
    }
    updateResume(auth, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.updateResume(auth.user_id, content);
            return successResponse_1.SuccessResponse;
        });
    }
};
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Post('/update'),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Get('/info'),
    __param(0, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Get('/resume'),
    __param(0, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getResume", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Post('/update-resume'),
    __param(0, common_1.Headers('auth')),
    __param(1, common_1.Body('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateResume", null);
UserController = __decorate([
    common_1.Controller('user/user'),
    common_1.UseGuards(user_guard_1.UserGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map