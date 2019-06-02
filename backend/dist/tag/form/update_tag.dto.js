"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class UpdateTagDto extends model_1.Model {
    constructor(data) {
        super();
        this.tag_id = undefined;
        this.name = undefined;
        this.picture = undefined;
        this.desc = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            tag_id: '标签id',
            name: '标题',
            desc: '描述',
            picture: '图片',
        };
    }
    rules() {
        return [[['name', 'picture', 'desc'], 'selectable', 'string']];
    }
}
exports.UpdateTagDto = UpdateTagDto;
//# sourceMappingURL=update_tag.dto.js.map