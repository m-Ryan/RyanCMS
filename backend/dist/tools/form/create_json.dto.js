"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class CreateJsonDto extends model_1.Model {
    constructor(data) {
        super();
        this.mod = undefined;
        this.name = undefined;
        this.content = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            mod: '模块',
            content: '内容',
            name: '名称',
        };
    }
    rules() {
        return [[['mod', 'content', 'name'], 'required']];
    }
}
exports.CreateJsonDto = CreateJsonDto;
//# sourceMappingURL=create_json.dto.js.map