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
const user_entity_1 = require("../../user/entities/user.entity");
let UserAuthorizeMiddleware = class UserAuthorizeMiddleware {
    constructor() { }
    resolve(...args) {
        return (req, res, next) => {
            const authorization = req.headers.authorization;
            if (authorization) {
                const token = authorization.replace('Ryan ', '');
                try {
                    req.headers.auth = user_entity_1.UserEntity.verify(token);
                }
                catch (error) { }
            }
            next();
        };
    }
};
UserAuthorizeMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], UserAuthorizeMiddleware);
exports.UserAuthorizeMiddleware = UserAuthorizeMiddleware;
//# sourceMappingURL=user.authorize.middleware.js.map