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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_guard_1 = require("../../common/guards/user.guard");
const index_service_1 = require("../service/index.service");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    getTyping(postDto) {
        return this.service.getJsonToTs(postDto.data);
    }
};
__decorate([
    common_1.Post('/get-json-to-ts'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getTyping", null);
UserController = __decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Controller('tools/user'),
    __metadata("design:paramtypes", [index_service_1.ToolsService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map