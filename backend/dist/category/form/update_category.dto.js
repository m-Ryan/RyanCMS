"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class UpdateCategoryDto extends model_1.Model {
    constructor(data) {
        super();
        this.category_id = undefined;
        this.name = undefined;
        this.picture = undefined;
        this.desc = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            category_id: '栏目id',
            name: '标题',
            desc: '描述',
            picture: '图片',
        };
    }
    rules() {
        return [[['name', 'picture', 'desc'], 'selectable', 'string']];
    }
}
exports.UpdateCategoryDto = UpdateCategoryDto;
//# sourceMappingURL=update_category.dto.js.map