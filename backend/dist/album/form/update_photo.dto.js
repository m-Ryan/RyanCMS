"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class UpdatePhotoDto extends model_1.Model {
    constructor(data) {
        super();
        this.photo_id = undefined;
        this.name = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            photo_id: '照片id',
            name: '名字'
        };
    }
    rules() {
        return [[['name'], 'string'], [['photo_id'], 'number']];
    }
}
exports.UpdatePhotoDto = UpdatePhotoDto;
//# sourceMappingURL=update_photo.dto.js.map