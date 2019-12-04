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
const index_service_1 = require("../service/index.service");
const create_json_dto_1 = require("../form/create_json.dto");
const update_json_dto_1 = require("../form/update_json.dto");
let VisitorController = class VisitorController {
    constructor(service) {
        this.service = service;
    }
    addJson(postDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new create_json_dto_1.CreateJsonDto(postDto);
            yield data.validate();
            return this.service.addJson(postDto.mod, postDto.name, postDto.content);
        });
    }
    updateJson(postDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new update_json_dto_1.UpdateJsonDto(postDto);
            yield data.validate();
            return this.service.updateJson(postDto.id, postDto.content);
        });
    }
    getJson(id) {
        return this.service.getJson(id);
    }
    getJsonList(page, size) {
        return this.service.getJsonList(page, size);
    }
    deleteJson(postDto) {
        return this.service.deleteJson(postDto.id);
    }
};
__decorate([
    common_1.Post('/add-json'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_json_dto_1.CreateJsonDto]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "addJson", null);
__decorate([
    common_1.Post('/update-json'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_json_dto_1.UpdateJsonDto]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "updateJson", null);
__decorate([
    common_1.Get('/get-json'),
    __param(0, common_1.Query('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VisitorController.prototype, "getJson", null);
__decorate([
    common_1.Get('/get-json-list'),
    __param(0, common_1.Query('page', new common_1.ParseIntPipe())), __param(1, common_1.Query('size', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], VisitorController.prototype, "getJsonList", null);
__decorate([
    common_1.Post('/delete-json'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VisitorController.prototype, "deleteJson", null);
VisitorController = __decorate([
    common_1.Controller('tools/visitor'),
    __metadata("design:paramtypes", [index_service_1.ToolsService])
], VisitorController);
exports.VisitorController = VisitorController;
//# sourceMappingURL=visitor.controller.js.map