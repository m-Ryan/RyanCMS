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
const notice_entity_1 = require("../entities/notice.entity");
const successResponse_1 = require("../../common/filters/successResponse");
let NoticeService = class NoticeService {
    constructor() { }
    createNotice(createNoticeDto, rank, userId) {
        return notice_entity_1.NoticeEntity.createNotice(createNoticeDto, rank, userId);
    }
    getList(userId, rank) {
        return notice_entity_1.NoticeEntity.getNewNoticeList(userId, rank);
    }
    setNoticeRead(noticeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield notice_entity_1.NoticeEntity.setNoticeRead(noticeId, userId);
            return successResponse_1.SuccessResponse;
        });
    }
    setAllNoticeRead(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield notice_entity_1.NoticeEntity.setAllNoticeRead(userId);
            return successResponse_1.SuccessResponse;
        });
    }
    deleteNotice(noticeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield notice_entity_1.NoticeEntity.deleteNotice(noticeId, userId);
            return successResponse_1.SuccessResponse;
        });
    }
};
NoticeService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], NoticeService);
exports.NoticeService = NoticeService;
//# sourceMappingURL=notice.service.js.map