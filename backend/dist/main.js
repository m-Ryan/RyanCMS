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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exception_filter_1 = require("./common/filters/exception.filter");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalFilters(new exception_filter_1.ExceptionFilter());
        app.useStaticAssets(path_1.default.join(__dirname, '..', 'public'));
        app.use(body_parser_1.default.json({ limit: '50mb' }));
        app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        yield app.listen(8080, () => {
            console.log('服务器已开启: http:localhost:8080');
        });
    });
}
bootstrap();
//# sourceMappingURL=main.js.map