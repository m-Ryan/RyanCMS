"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class UpdateArticleDto extends model_1.Model {
    constructor(data) {
        super();
        this.article_id = undefined;
        this.title = undefined;
        this.content = undefined;
        this.summary = undefined;
        this.picture = undefined;
        this.secret = undefined;
        this.tags = undefined;
        this.category_id = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            article_id: '文章id',
            title: '标题',
            content: '内容',
            summary: '摘要',
            picture: '图片',
            tags: '标签',
            secret: '是否私人',
            category_id: '标签id',
        };
    }
    rules() {
        return [
            [['article_id'], 'required'],
            [['title', 'content', 'summary', 'picture'], 'selectable', 'string'],
            [['secret'], 'selectable', 'number'],
            [['tags'], 'selectable', 'array'],
        ];
    }
}
exports.UpdateArticleDto = UpdateArticleDto;
//# sourceMappingURL=update_article.dto.js.map