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
const tag_entity_1 = require("../entities/tag.entity");
const userError_1 = require("../../common/filters/userError");
let TagService = class TagService {
    constructor() { }
    createTag(createTagDto, userId) {
        if (/[\\\/]/.test(createTagDto.name)) {
            throw new userError_1.UserError('标题不能包含非法字符');
        }
        return tag_entity_1.TagEntity.createTag(createTagDto, userId);
    }
    updateTag(updateTagDto, userId) {
        if (/[\\\/]/.test(updateTagDto.name)) {
            throw new userError_1.UserError('标题不能包含非法字符');
        }
        return tag_entity_1.TagEntity.updateTag(updateTagDto, userId);
    }
    daleteTag(tagId, userId) {
        return tag_entity_1.TagEntity.deleteTag(tagId, userId);
    }
    getList(page, size, userId) {
        return tag_entity_1.TagEntity.getList(page, size, userId);
    }
    getTag(userId, name) {
        return tag_entity_1.TagEntity.getTag(userId, name);
    }
};
TagService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map