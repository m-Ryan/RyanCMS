"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class UpdateAlbumDto extends model_1.Model {
    constructor(data) {
        super();
        this.album_id = undefined;
        this.name = undefined;
        this.picture = undefined;
        this.desc = undefined;
        this.secret = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            album_id: '栏目id',
            name: '标题',
            desc: '描述',
            picture: '图片',
            secret: '是否私密'
        };
    }
    rules() {
        return [[['name', 'picture', 'desc'], 'selectable', 'string'], [['secret'], 'selectable', 'number']];
    }
}
exports.UpdateAlbumDto = UpdateAlbumDto;
//# sourceMappingURL=update_album.dto.js.map