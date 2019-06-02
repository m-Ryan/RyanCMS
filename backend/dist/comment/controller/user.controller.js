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
const comment_service_1 = require("../service/comment.service");
const user_guard_1 = require("../../common/guards/user.guard");
const create_message_dto_1 = require("../form/create_message.dto");
const create_replay_dto_1 = require("../form/create_replay.dto");
const successResponse_1 = require("../../common/filters/successResponse");
let UserController = class UserController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    createMessage(crateMessageDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new create_message_dto_1.CreateMessageDto(crateMessageDto);
            yield data.validate();
            return this.commentService.createMessage(data, auth.user_id);
        });
    }
    createReplay(crateReplayDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new create_replay_dto_1.CreateReplayDto(crateReplayDto);
            yield data.validate();
            return this.commentService.createReplay(data, auth.user_id);
        });
    }
    deleteMessage(messageId, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commentService.deleteMessage(messageId, auth.user_id);
            return successResponse_1.SuccessResponse;
        });
    }
    deleteReplay(replayId, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commentService.deleteReplay(replayId, auth.user_id);
            return successResponse_1.SuccessResponse;
        });
    }
};
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Post('/create-message'),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createMessage", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Post('/create-replay'),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_replay_dto_1.CreateReplayDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createReplay", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Get('/delete-message'),
    __param(0, common_1.Query('message_id', new common_1.ParseIntPipe())),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteMessage", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Get('/delete-replay'),
    __param(0, common_1.Query('replay_id', new common_1.ParseIntPipe())),
    __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteReplay", null);
UserController = __decorate([
    common_1.Controller('comment/user'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map