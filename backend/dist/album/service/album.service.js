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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const photo_entity_1 = require("../entities/photo.entity");
const album_entity_1 = require("../entities/album.entity");
let AlbumService = class AlbumService {
    constructor() { }
    createAlbum(createAlbumeDto, userId) {
        return album_entity_1.AlbumEntity.createAlbum(createAlbumeDto, userId);
    }
    updateAlbum(updateAlbumDto, userId) {
        return album_entity_1.AlbumEntity.updateAlbum(updateAlbumDto, userId);
    }
    daleteAlbum(tagId, userId) {
        return album_entity_1.AlbumEntity.deleteAlbum(tagId, userId);
    }
    getList(page, size, userId, secret, needRelations) {
        return album_entity_1.AlbumEntity.getList(page, size, userId, secret, needRelations);
    }
    createPhotos(createPhotosDto, userId) {
        return photo_entity_1.PhototEntity.createPhotos(createPhotosDto, userId);
    }
    getPhotoList(page, size, albumName, userId) {
        return photo_entity_1.PhototEntity.getList(page, size, albumName, userId);
    }
    updatePhoto(updatePhotoDto, userId) {
        return photo_entity_1.PhototEntity.updatePhoto(updatePhotoDto, userId);
    }
    deletePhotos(photoIds, userId) {
        return photo_entity_1.PhototEntity.deletePhotos(photoIds, userId);
    }
};
AlbumService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AlbumService);
exports.AlbumService = AlbumService;
//# sourceMappingURL=album.service.js.map