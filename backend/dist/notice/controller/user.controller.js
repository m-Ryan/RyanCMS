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
const user_guard_1 = require("../../common/guards/user.guard");
const notice_service_1 = require("../service/notice.service");
const User_1 = require("../../common/constant/User");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    getList(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const rank = User_1.USER_RANK;
            return this.service.getList(auth.user_id, rank);
        });
    }
    setNoticeRead(auth, noticeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.setNoticeRead(noticeId, auth.user_id);
        });
    }
    setAllNoticeRead(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.setAllNoticeRead(auth.user_id);
        });
    }
};
__decorate([
    common_1.Get('/list'),
    __param(0, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getList", null);
__decorate([
    common_1.Get('/set-read'),
    __param(0, common_1.Headers('auth')),
    __param(1, common_1.Query('notice_id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setNoticeRead", null);
__decorate([
    common_1.Get('/set-all-read'),
    __param(0, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setAllNoticeRead", null);
UserController = __decorate([
    common_1.Controller('notice/user'),
    common_1.UseGuards(user_guard_1.UserGuard),
    __metadata("design:paramtypes", [notice_service_1.NoticeService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map