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
const notice_service_1 = require("../service/notice.service");
const create_notice_dto_1 = require("../form/create_notice.dto");
const User_1 = require("../../common/constant/User");
const admin_guard_1 = require("../../common/guards/admin.guard");
let AdminController = class AdminController {
    constructor(service) {
        this.service = service;
    }
    createAdminNoticeDto(createNoticeDto, auth) {
        const rank = User_1.ADMIN_RANK;
        return this.service.createNotice(createNoticeDto, rank, auth.user_id);
    }
    createNoticeDto(createNoticeDto, auth) {
        const rank = User_1.USER_RANK;
        return this.service.createNotice(createNoticeDto, rank, auth.user_id);
    }
    getList(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const rank = User_1.ADMIN_RANK;
            return this.service.getList(auth.user_id, rank);
        });
    }
    deleteNotice(auth, noticeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.deleteNotice(auth.user_id, noticeId);
        });
    }
};
__decorate([
    common_1.Post('/create-admin-notice'),
    __param(0, common_1.Body()), __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notice_dto_1.CreateNoticeDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createAdminNoticeDto", null);
__decorate([
    common_1.Post('/create-notice'),
    __param(0, common_1.Body()), __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notice_dto_1.CreateNoticeDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createNoticeDto", null);
__decorate([
    common_1.Get('/list'),
    __param(0, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getList", null);
__decorate([
    common_1.Get('/delete-notice'),
    __param(0, common_1.Headers('auth')), __param(1, common_1.Query('notice_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteNotice", null);
AdminController = __decorate([
    common_1.Controller('notice/admin'),
    common_1.UseGuards(admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [notice_service_1.NoticeService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map