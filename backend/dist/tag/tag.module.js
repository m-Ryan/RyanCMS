"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./service/tag.service");
const user_controller_1 = require("./controller/user.controller");
const admin_controller_1 = require("./controller/admin.controller");
const visitor_controller_1 = require("./controller/visitor.controller");
let TagModule = class TagModule {
};
TagModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [user_controller_1.UserController, admin_controller_1.AdminController, visitor_controller_1.VisitorController],
        providers: [tag_service_1.TagService],
    })
], TagModule);
exports.TagModule = TagModule;
//# sourceMappingURL=tag.module.js.map