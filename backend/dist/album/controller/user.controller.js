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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_guard_1 = require("../../common/guards/user.guard");
const album_service_1 = require("../service/album.service");
const create_album_dto_1 = require("../form/create_album.dto");
const update_album_dto_1 = require("../form/update_album.dto");
const successResponse_1 = require("../../common/filters/successResponse");
const create_photos_dto_1 = require("../form/create_photos.dto");
const update_photo_dto_1 = require("../form/update_photo.dto");
const userError_1 = require("../../common/filters/userError");
const lodash_1 = __importDefault(require("lodash"));
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    createAlbum(createAlbumeDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new create_album_dto_1.CreateAlbumeDto(createAlbumeDto);
            yield data.validate();
            return this.service.createAlbum(data, auth.user_id);
        });
    }
    getList(auth, page = 1, size = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getList(page, size, auth.user_id);
        });
    }
    daleteTag(albumId, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.service.daleteAlbum(albumId, auth.user_id);
            return successResponse_1.SuccessResponse;
        });
    }
    updateTag(updateAlbumDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new update_album_dto_1.UpdateAlbumDto(updateAlbumDto);
            yield data.validate();
            return this.service.updateAlbum(data, auth.user_id);
        });
    }
    createAlbumPhotos(createPhotosDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new create_photos_dto_1.CreatePhotosDto(createPhotosDto);
            yield data.validate();
            return this.service.createPhotos(data, auth.user_id);
        });
    }
    getPhotoList(auth, page = 1, size = 10, albumName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getPhotoList(page, size, albumName, auth.user_id);
        });
    }
    updatePhoto(updatePhotoDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new update_photo_dto_1.UpdatePhotoDto(updatePhotoDto);
            yield data.validate();
            return this.service.updatePhoto(data, auth.user_id);
        });
    }
    deletePhotos(photoIds, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            if (photoIds.length === 0) {
                throw new userError_1.UserError('至少需要一个id');
            }
            photoIds.forEach((item) => {
                if (!lodash_1.default.isInteger(item)) {
                    throw new userError_1.UserError('参数有误');
                }
            });
            yield this.service.deletePhotos(photoIds, auth.user_id);
            return successResponse_1.SuccessResponse;
        });
    }
};
__decorate([
    common_1.Post('/create-album'),
    __param(0, common_1.Body()), __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_album_dto_1.CreateAlbumeDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createAlbum", null);
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
    common_1.Get('/delete-album'),
    __param(0, common_1.Query('album_id')), __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "daleteTag", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Post('/update-album'),
    __param(0, common_1.Body()), __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_album_dto_1.UpdateAlbumDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateTag", null);
__decorate([
    common_1.Post('/create-photos'),
    __param(0, common_1.Body()), __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_photos_dto_1.CreatePhotosDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createAlbumPhotos", null);
__decorate([
    common_1.Get('/photo-list'),
    __param(0, common_1.Headers('auth')),
    __param(1, common_1.Query('page', new common_1.ParseIntPipe())),
    __param(2, common_1.Query('size', new common_1.ParseIntPipe())),
    __param(3, common_1.Query('album_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPhotoList", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Post('/update-photo'),
    __param(0, common_1.Body()), __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_photo_dto_1.UpdatePhotoDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePhoto", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Post('/delete-photos'),
    __param(0, common_1.Body('photo_ids')), __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deletePhotos", null);
UserController = __decorate([
    common_1.Controller('album/user'),
    common_1.UseGuards(user_guard_1.UserGuard),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map