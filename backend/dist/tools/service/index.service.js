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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const puppeteer_1 = __importDefault(require("puppeteer"));
const upload_1 = require("../../util/upload");
const userError_1 = require("../../common/filters/userError");
const { json2ts } = require('json-ts');
const PDF_NAME = process.cwd() + '/public/temp.pdf';
let ToolsService = class ToolsService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getJsonToTs(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return json2ts(data);
        });
    }
    getPDF(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const browser = yield puppeteer_1.default.launch();
                const page = yield browser.newPage();
                yield page.setContent(data);
                yield page.emulateMedia('screen');
                yield page.pdf({ path: PDF_NAME, format: 'A4', printBackground: true });
                yield browser.close();
                const rfs = yield upload_1.fsReadAsync(PDF_NAME);
                const resUrl = yield upload_1.uploadQiuNiuFile({ data: rfs });
                yield upload_1.fsUnlinkAsync(PDF_NAME);
                return resUrl;
            }
            catch (error) {
                throw new userError_1.UserError(error.message);
            }
        });
    }
    getPagePDF(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const browser = yield puppeteer_1.default.launch();
                const page = yield browser.newPage();
                yield page.goto(url);
                yield page.emulateMedia('screen');
                yield page.pdf({ path: PDF_NAME, format: 'A4', printBackground: true });
                yield browser.close();
                const rfs = yield upload_1.fsReadAsync(PDF_NAME);
                const resUrl = yield upload_1.uploadQiuNiuFile({ data: rfs });
                yield upload_1.fsUnlinkAsync(PDF_NAME);
                return resUrl;
            }
            catch (error) {
                throw new userError_1.UserError(error.message);
            }
        });
    }
};
ToolsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], ToolsService);
exports.ToolsService = ToolsService;
//# sourceMappingURL=index.service.js.map