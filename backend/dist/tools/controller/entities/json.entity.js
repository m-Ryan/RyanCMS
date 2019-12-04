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
var JsonEntity_1;
const typeorm_1 = require("typeorm");
const userError_1 = require("../../../common/filters/userError");
const dayjs = require("dayjs");
let JsonEntity = JsonEntity_1 = class JsonEntity extends typeorm_1.BaseEntity {
    static addJson(mod, name, content) {
        const json = new JsonEntity_1();
        json.mod = mod;
        json.name = name;
        json.content = content;
        json.created_at = dayjs().unix();
        return json.save();
    }
    static getJson(id) {
        return this.findOne(id);
    }
    static getJsonList(page = 1, size = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findAndCount({
                skip: (page - 1) * size,
                take: size,
                order: {
                    json_id: 'DESC'
                },
            });
            return {
                list: result[0],
                count: result[1]
            };
        });
    }
    static deleteJson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(id);
        });
    }
    static updateJson(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = yield this.findOne(id);
            if (!json) {
                throw new userError_1.UserError('json不存在');
            }
            json.content = content;
            yield json.save();
            return json;
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], JsonEntity.prototype, "json_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], JsonEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], JsonEntity.prototype, "mod", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], JsonEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'longtext'
    }),
    __metadata("design:type", String)
], JsonEntity.prototype, "content", void 0);
JsonEntity = JsonEntity_1 = __decorate([
    typeorm_1.Entity('json')
], JsonEntity);
exports.JsonEntity = JsonEntity;
//# sourceMappingURL=json.entity.js.map