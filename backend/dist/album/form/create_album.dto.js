"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class CreateAlbumeDto extends model_1.Model {
    constructor(data) {
        super();
        this.name = undefined;
        this.desc = undefined;
        this.secret = undefined;
        this.picture = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            name: '标题',
            desc: '描述',
            secret: '是否私人'
        };
    }
    rules() {
        return [[['name', 'desc', 'picture'], 'string'], [['secret'], 'number']];
    }
}
exports.CreateAlbumeDto = CreateAlbumeDto;
//# sourceMappingURL=create_album.dto.js.map