"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class UpdateJsonDto extends model_1.Model {
    constructor(data) {
        super();
        this.id = undefined;
        this.content = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            id: 'id',
            content: '内容',
        };
    }
    rules() {
        return [[['id', 'content'], 'required']];
    }
}
exports.UpdateJsonDto = UpdateJsonDto;
//# sourceMappingURL=update_json.dto.js.map