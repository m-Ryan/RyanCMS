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
const category_service_1 = require("../service/category.service");
const user_guard_1 = require("../../common/guards/user.guard");
const successResponse_1 = require("../../common/filters/successResponse");
const update_category_dto_1 = require("../form/update_category.dto");
const create_category_dto_1 = require("../form/create_category.dto");
let UserController = class UserController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    createCategory(crateCategoryDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new create_category_dto_1.CreateCategoryDto(crateCategoryDto);
            yield data.validate();
            return this.categoryService.createCategory(data, auth.user_id);
        });
    }
    getList(auth, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryService.getList(page, size, auth.user_id);
        });
    }
    daleteTag(categoryId, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.categoryService.daleteCategory(categoryId, auth.user_id);
            return successResponse_1.SuccessResponse;
        });
    }
    updateTag(updateCategoryDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new update_category_dto_1.UpdateCategoryDto(updateCategoryDto);
            yield data.validate();
            return this.categoryService.updateCategory(data, auth.user_id);
        });
    }
};
__decorate([
    common_1.Post('/create-category'),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createCategory", null);
__decorate([
    common_1.Get('/list'),
    __param(0, common_1.Headers('auth')),
    __param(1, common_1.Query('page', new common_1.ParseIntPipe())),
    __param(2, common_1.Query('size', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getList", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Get('/delete-category'),
    __param(0, common_1.Query('category_id')),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "daleteTag", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Post('/update-category'),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateTag", null);
UserController = __decorate([
    common_1.Controller('category/user'),
    common_1.UseGuards(user_guard_1.UserGuard),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map