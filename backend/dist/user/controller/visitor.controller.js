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
const register_dto_1 = require("../form/register.dto");
const login_dto_1 = require("../form/login.dto");
const User_1 = require("../../common/constant/User");
const userError_1 = require("../../common/filters/userError");
let VisitorController = class VisitorController {
    constructor(userService) {
        this.userService = userService;
    }
    register(registerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new register_dto_1.RegisterDto(registerDto);
            yield data.validate();
            return this.userService.register(data, User_1.USER_RANK);
        });
    }
    login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new login_dto_1.LoginDto(loginDto);
            yield data.validate();
            return this.userService.login(loginDto);
        });
    }
    getBaseInfo(nickname, domain, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!nickname && !userId && !domain) {
                throw new userError_1.UserError('bad request');
            }
            return this.userService.getBaseInfo(nickname, userId, domain);
        });
    }
    getDomainList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getDomainList();
        });
    }
    getResume(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getResume(userId);
        });
    }
};
__decorate([
    common_1.Post('/register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "register", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "login", null);
__decorate([
    common_1.Get('/base_info'),
    __param(0, common_1.Query('nickname')),
    __param(1, common_1.Query('domain')),
    __param(2, common_1.Query('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "getBaseInfo", null);
__decorate([
    common_1.Get('/domain-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "getDomainList", null);
__decorate([
    common_1.Get('/resume'),
    __param(0, common_1.Query('user_id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "getResume", null);
VisitorController = __decorate([
    common_1.Controller('user/visitor'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], VisitorController);
exports.VisitorController = VisitorController;
//# sourceMappingURL=visitor.controller.js.map