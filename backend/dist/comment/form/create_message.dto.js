"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class CreateMessageDto extends model_1.Model {
    constructor(data) {
        super();
        this.content = undefined;
        this.comment_id = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            content: '内容',
            comment_id: 'comment_id',
        };
    }
    rules() {
        return [[['content', 'comment_id'], 'required']];
    }
}
exports.CreateMessageDto = CreateMessageDto;
//# sourceMappingURL=create_message.dto.js.map