"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class CreateReplayDto extends model_1.Model {
    constructor(data) {
        super();
        this.content = undefined;
        this.message_id = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            content: '内容',
            message_id: '楼层id',
        };
    }
    rules() {
        return [[['content', 'message_id'], 'required']];
    }
}
exports.CreateReplayDto = CreateReplayDto;
//# sourceMappingURL=create_replay.dto.js.map