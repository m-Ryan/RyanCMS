"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class CreateArticleDto extends model_1.Model {
    constructor(data) {
        super();
        this.title = undefined;
        this.content = undefined;
        this.summary = undefined;
        this.picture = undefined;
        this.tags = undefined;
        this.secret = undefined;
        this.category_id = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            title: '标题',
            content: '内容',
            summary: '摘要',
            picture: '图片',
            tags: '标签',
            secret: '是否私人',
            category_id: '文章类型',
        };
    }
    rules() {
        return [
            [['title', 'content', 'summary', 'picture'], 'string'],
            [['tags'], 'array'],
            [['secret'], 'number'],
            [['category_id'], 'required'],
        ];
    }
}
exports.CreateArticleDto = CreateArticleDto;
//# sourceMappingURL=create_article.dto.js.map