"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
const lodash_1 = __importDefault(require("lodash"));
class CreatePhotosDto extends model_1.Model {
    constructor(data) {
        super();
        this.album_name = undefined;
        this.photos = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            album_name: '相册名称',
            photos: '图片集合'
        };
    }
    rules() {
        return [
            [['album_name'], 'string'],
            [
                ['photos'],
                () => {
                    if (!this.photos.every((url) => lodash_1.default.isString(url) && !!url)) {
                        return '格式错误';
                    }
                }
            ]
        ];
    }
}
exports.CreatePhotosDto = CreatePhotosDto;
//# sourceMappingURL=create_photos.dto.js.map