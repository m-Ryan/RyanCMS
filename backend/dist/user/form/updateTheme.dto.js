"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class UpdateThemeDto extends model_1.Model {
    constructor(data) {
        super();
        this.music = undefined;
        this.color = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            color: '主题色',
            music: '主题音乐'
        };
    }
    rules() {
        return [[['color', 'music'], 'selectable', 'string']];
    }
}
exports.UpdateThemeDto = UpdateThemeDto;
//# sourceMappingURL=updateTheme.dto.js.map