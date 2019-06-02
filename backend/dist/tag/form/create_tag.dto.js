"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class CreateTagDto extends model_1.Model {
    constructor(data) {
        super();
        this.name = undefined;
        this.picture = undefined;
        this.desc = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            name: '标题',
            desc: '描述',
            picture: '图片',
        };
    }
    rules() {
        return [[['name', 'picture', 'desc'], 'required']];
    }
}
exports.CreateTagDto = CreateTagDto;
//# sourceMappingURL=create_tag.dto.js.map