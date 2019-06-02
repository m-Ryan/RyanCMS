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
const constance_1 = require("../constance");
const map_service_1 = require("../service/map.service");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    formatAddress(lng, lat) {
        return this.service.formatAddress(lng, lat, constance_1.BACKEDN_MAP_KEY);
    }
};
__decorate([
    common_1.Get('/format-address'),
    __param(0, common_1.Query('lng')), __param(1, common_1.Query('lat')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "formatAddress", null);
UserController = __decorate([
    common_1.Controller('map/user'),
    common_1.UseGuards(user_guard_1.UserGuard),
    __metadata("design:paramtypes", [map_service_1.MapService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map