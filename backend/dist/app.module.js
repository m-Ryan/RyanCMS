"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const tag_module_1 = require("./tag/tag.module");
const article_module_1 = require("./article/article.module");
const category_module_1 = require("./category/category.module");
const upload_module_1 = require("./upload/upload.module");
const comment_module_1 = require("./comment/comment.module");
const common_module_1 = require("./common/common.module");
const user_authorize_middleware_1 = require("./common/middlewares/user.authorize.middleware");
const album_module_1 = require("./album/album.module");
const notice_module_1 = require("./notice/notice.module");
const map_module_1 = require("./map/map.module");
const file = process.cwd() + '/config/ormconfig.json';
const ormConfig = require(file);
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(user_authorize_middleware_1.UserAuthorizeMiddleware).forRoutes('');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(ormConfig),
            common_module_1.CommonModule,
            user_module_1.UserModule,
            tag_module_1.TagModule,
            article_module_1.ArticleModule,
            category_module_1.CategoryModule,
            upload_module_1.UploadModule,
            album_module_1.AlbumModule,
            notice_module_1.NoticeModule,
            map_module_1.MapModule,
            comment_module_1.CommentModule
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map