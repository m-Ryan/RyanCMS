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
const upload_service_1 = require("../service/upload.service");
const userError_1 = require("../../common/filters/userError");
const upload_1 = require("../../util/upload");
const qiniu_1 = __importDefault(require("qiniu"));
const tranform_to_readstream_1 = __importDefault(require("tranform-to-readstream"));
let UserController = class UserController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    updateTag(file, auth) {
        if (file.size > 2 * 1024 * 1024) {
            throw new userError_1.UserError('上传图片不能大于2M');
        }
        return upload_1.Upload.writeImage(file);
    }
    getQiuNiuToken() {
        const { token, origin } = getQiniu();
        return {
            token,
            origin
        };
    }
    uploadQiuNiuFile(fileData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileData.data) {
                throw new userError_1.UserError('文件数据不能为空');
            }
            if (!fileData.name) {
                throw new userError_1.UserError('文件名不能为空');
            }
            const { token, origin, options } = getQiniu(fileData.name);
            const readerStream = new tranform_to_readstream_1.default(fileData.data);
            const formUploader = new qiniu_1.default.form_up.FormUploader(options);
            const putExtra = new qiniu_1.default.form_up.PutExtra();
            return new Promise((resolve, reject) => {
                formUploader.putStream(token, fileData.name, readerStream, putExtra, (respErr, respBody, respInfo) => {
                    if (respErr) {
                        throw respErr;
                    }
                    if (respInfo.statusCode === 200) {
                        resolve(origin + '/' + respBody.key);
                    }
                    else {
                        console.log(respInfo);
                        throw new userError_1.UserError('上传失败');
                    }
                });
            });
        });
    }
};
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.UseInterceptors(common_1.FileInterceptor('file')),
    common_1.Post('/image'),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Headers('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateTag", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.Get('/qiniu-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getQiuNiuToken", null);
__decorate([
    common_1.Post('/upload-qiniu-file'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadQiuNiuFile", null);
UserController = __decorate([
    common_1.Controller('upload/user'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UserController);
exports.UserController = UserController;
function getQiniu(name) {
    const accessKey = '2WAZdi48g5fLK3645nwy8FEb5_XaqYooOhh35AuG';
    const secretKey = 'XIKjs-HKSEiOusWztCRQ565KvDAcQRxHtY5ZO_xh';
    const mac = new qiniu_1.default.auth.digest.Mac(accessKey, secretKey);
    const options = {
        scope: 'mryan'
    };
    if (name) {
        options.scope = 'mryan:' + name;
    }
    const putPolicy = new qiniu_1.default.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return {
        token: uploadToken,
        origin: 'http://assets.maocanhua.cn',
        options
    };
}
//# sourceMappingURL=user.controller.js.map