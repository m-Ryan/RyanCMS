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
const tag_service_1 = require("../service/tag.service");
let VisitorController = class VisitorController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    getList(page, size, uerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagService.getList(page, size, uerId);
        });
    }
    getTag(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagService.getTag(userId, name);
        });
    }
};
__decorate([
    common_1.Get('/list'),
    __param(0, common_1.Query('page', new common_1.ParseIntPipe())),
    __param(1, common_1.Query('size', new common_1.ParseIntPipe())),
    __param(2, common_1.Query('user_id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "getList", null);
__decorate([
    common_1.Get('/info'),
    __param(0, common_1.Query('user_id', new common_1.ParseIntPipe())),
    __param(1, common_1.Query('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "getTag", null);
VisitorController = __decorate([
    common_1.Controller('tag/visitor'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], VisitorController);
exports.VisitorController = VisitorController;
//# sourceMappingURL=visitor.controller.js.map