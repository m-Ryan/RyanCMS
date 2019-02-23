"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class CreateNoticeDto extends model_1.Model {
    constructor(data) {
        super();
        this.title = undefined;
        this.content = undefined;
        this.type = undefined;
        this.link = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            title: '标题',
            content: '详情',
            type: '类型'
        };
    }
    rules() {
        return [[['title', 'content', 'type'], 'required']];
    }
}
exports.CreateNoticeDto = CreateNoticeDto;
//# sourceMappingURL=create_notice.dto.js.map