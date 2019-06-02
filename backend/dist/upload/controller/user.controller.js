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
const upload_service_1 = require("../service/upload.service");
const upload_1 = require("../../util/upload");
let UserController = class UserController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    getQiuNiuToken() {
        const { token, origin } = upload_1.getQiniu();
        return {
            token,
            origin
        };
    }
    uploadQiuNiuFile(fileData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadService.uploadQiuNiuFile(fileData);
        });
    }
};
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Get('/qiniu-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getQiuNiuToken", null);
__decorate([
    common_1.Post('/upload-qiniu-file'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadQiuNiuFile", null);
UserController = __decorate([
    common_1.Controller('upload/user'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map