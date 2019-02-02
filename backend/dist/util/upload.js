"use strict";
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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const userError_1 = require("../common/filters/userError");
const UPLOAD_DIR = 'upload';
class Upload {
    static writeImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = new Date().getTime() + file.originalname;
            const dir = path_1.default.join(process.cwd(), 'public', UPLOAD_DIR);
            const url = path_1.default.join(UPLOAD_DIR, name);
            const fileName = path_1.default.join(dir, name);
            const existDir = yield new Promise(resolve => fs_1.default.exists(dir, resolve));
            if (!existDir) {
                const error = yield new Promise(resolve => fs_1.default.mkdir(dir, resolve));
                if (error) {
                    throw new userError_1.UserError('创建上传目录失败');
                }
            }
            return new Promise(resolve => {
                return fs_1.default.writeFile(fileName, file.buffer, err => {
                    if (err) {
                        console.log(err);
                        throw new userError_1.UserError('写入图片失败');
                    }
                    resolve(url);
                });
            });
        });
    }
}
exports.Upload = Upload;
//# sourceMappingURL=upload.js.map