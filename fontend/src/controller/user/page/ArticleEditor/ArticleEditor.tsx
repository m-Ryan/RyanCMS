import { Input, Select, Button, message, Switch, Modal, Icon } from 'antd';
import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import styles from './ArticleEditor.module.scss';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import CustomEditor from '../../../../components/CustomEditor/CustomEditor';
import { API } from '../../../../services/API';
import { catchError } from '../../../../util/decorators/catchError';
import { Tag as ITag } from '../../../../interface/tag.interface';
import { validate } from '../../../../util/decorators/validator/validate';
import { loading } from '../../../../util/decorators/loading';
import { notEmpty } from '../../../../util/decorators/validator/rules';
import { ClearUnmountState } from '../../../../util/decorators/clearUnmountState';
import { User } from '../../../../interface/user.interface';
import { ReactAutoBind } from '../../../../util/decorators/reactAutoBind';
import { TagResponse } from '../../../../services/tag';
import { CategoryResponse } from '../../../../services/category';
import CustomImageUpload from '../../../../components/CustomImageUpload/CustomImageUpload';
import { CustomLoading } from '../../../../components/CustomLoading/CustomLoading';
import { unescapeHTML } from '../../../../util/escape';

const InputGroup = Input.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
interface Props extends RouteProps, RouterProps {
	user: User;
}

interface FormData {
	article_id: number;
	writer_id: number;
	category_id: number;
	picture: string;
	title: string;
	summary: string;
	updated_at: number;
	created_at: number;
	secret: number;
	content: {
		content: string;
	};
	tags: ITag[];
}
interface State {
	tags: TagResponse | null;
	categorys: CategoryResponse | null;
	formData: FormData;
	loading: boolean;
	fetched: boolean;
}
const initFormData = {
	article_id: 0,
	writer_id: 0,
	category_id: 0,
	title: '',
	summary: '',
	picture: 'http://assets.maocanhua.cn/FtCz4kJRH2c-SqtScIbql3q3OiS5',
	updated_at: 0,
	created_at: 0,
	secret: 0,
	content: {
		content: ''
	},
	tags: []
};
@ClearUnmountState()
@ReactAutoBind()
export default class ArticleEditor extends React.Component<Props, State> {
	state: State = {
		tags: null,
		loading: false,
		fetched: true,
		categorys: null,
		formData: initFormData
	};

	constructor(props: Props) {
		super(props);
	}

	async componentDidMount() {
		await Promise.all([ this.getCategorys(), this.getTags(), this.getArticle() ]);
		this.setState({ fetched: false });
	}

	@catchError()
	async getArticle() {
		const { user } = this.props;
		const articleId = Number(window.location.search.replace('?id=', ''));
		if (!articleId) return;
		const result = await API.article.user.getArticle({
			user_id: user.user_id,
			article_id: articleId
		});
		result.content.content = unescapeHTML(result.content.content);
		this.setState({
			formData: result
		});
	}

	@catchError()
	async getCategorys() {
		const result = await API.category.user.getList(1, 999);
		if (!result.count) {
			return message.warn('暂无分类，请先到栏目管理添加分类');
		}
		const { formData } = this.state;
		formData.category_id = result.list[0].category_id;
		this.setState({
			categorys: result,
			formData: { ...formData }
		});
	}

	@catchError()
	async getTags() {
		const result = await API.tag.user.getList(1, 999);
		if (!result.count) {
			return message.warn('暂无标签，请先到标签管理添加分类');
		}
		this.setState({
			tags: result
		});
	}

	onSetPrivate(checked: number) {
		const { formData } = this.state;
		formData.secret = checked;
		this.setState({
			formData: { ...formData }
		});
	}

	onSelectCategory(categoryId: number) {
		const { formData } = this.state;
		formData.category_id = categoryId;
		this.setState({
			formData: { ...formData }
		});
	}

	onSelectTag(tagIds: number[], option: React.ReactElement<any> | React.ReactElement<any>[]) {
		const { formData, tags } = this.state;
		const selectTags = tags!.list.filter((item) => tagIds.some((tagId) => item.tag_id === tagId));
		formData.tags = selectTags;
		this.setState({
			formData: { ...formData }
		});
	}

	reomveTag(tagId: number) {
		const { formData } = this.state;

		formData.tags = formData.tags.filter((item) => item.tag_id !== tagId);
		this.setState({
			formData: { ...formData }
		});
	}

	onReomvePic() {
		const { formData } = this.state;

		formData.picture = '';
		this.setState({
			formData: { ...formData }
		});
	}

	onChangeTitle(value: string) {
		const { formData } = this.state;
		formData.title = value.trimLeft();
		this.setState({
			formData: { ...formData }
		});
	}

	onUpload(url: string) {
		const { formData } = this.state;
		formData.picture = url;
		this.setState({
			formData: { ...formData }
		});
	}

	onChangeContent(value: string) {
		const { formData } = this.state;
		formData.content.content = value;
		return new Promise((resolve) => {
			this.setState(
				{
					formData
				},
				resolve
			);
		});
	}

	onChangeSummary(value: string) {
		const { formData } = this.state;
		formData.summary = value.trimLeft();
		this.setState({
			formData: { ...formData }
		});
	}

	@validate()
	@loading()
	@catchError()
	async create(
		@notEmpty('标题') title: string,
		@notEmpty('内容') content: string,
		@notEmpty('摘要') summary: string,
		@notEmpty('标题图') picture: string,
		@notEmpty('分类') category_id: number,
		@notEmpty('标签') tags: number[],
		secret: number
	) {
		const article = await API.article.user.createArticle({
			title,
			content,
			summary,
			picture,
			tags,
			category_id,
			secret
		});
		const { user } = this.props;
		this.setState({
			formData: article
		});
		Modal.confirm({
			title: '发布成功',
			content: null,
			okText: '查看详情',
			cancelText: '确定',
			maskClosable: true,
			icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
			onOk: () => this.props.history.push(`/u/${user.nickname}/a/${title}`)
		});
	}

	@validate()
	@loading()
	@catchError()
	async update(
		@notEmpty('文章id') article_id: number,
		@notEmpty('标题') title: string,
		@notEmpty('内容') content: string,
		@notEmpty('摘要') summary: string,
		@notEmpty('标题图') picture: string,
		@notEmpty('分类') category_id: number,
		@notEmpty('标签') tags: number[],
		secret: number
	) {
		await API.article.user.updateArticle({
			article_id,
			title,
			content,
			summary,
			picture,
			tags,
			category_id,
			secret
		});
		const { user } = this.props;
		Modal.confirm({
			title: '更新成功',
			content: null,
			okText: '查看详情',
			cancelText: '确定',
			maskClosable: true,
			icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
			onOk: () => this.props.history.push(`/u/${user.nickname}/a/${title}`)
		});
	}

	submit() {
		const { formData } = this.state;
		const { article_id, title, content, summary, picture, tags, category_id, secret } = formData;
		const contentText = content.content;
		const tagIds = tags.map((item) => item.tag_id);
		if (article_id) {
			this.update(article_id, title, contentText, summary, picture, category_id, tagIds, secret);
		} else {
			this.create(title, contentText, summary, picture, category_id, tagIds, secret);
		}
	}

	public render() {
		const { categorys, tags, formData, loading, fetched } = this.state;
		return !fetched ? (
			<div className={styles['container']}>
				<LayoutTitle
					title="编辑"
					aside={
						<Button loading={loading} type="primary" onClick={() => this.submit()}>
							提交
						</Button>
					}
				/>

				<div className={styles['header']}>
					<InputGroup size="large" compact>
						<Select
							value={formData.category_id}
							onSelect={(catagoryId) => this.onSelectCategory(Number(catagoryId))}
							style={{ width: 100 }}
							placeholder="选择类型"
						>
							{categorys &&
								categorys.list.map((item) => (
									<Option key={item.category_id.toString()} value={item.category_id}>
										{item.name}
									</Option>
								))}
						</Select>

						<Input
							value={formData.title}
							onChange={(e) => this.onChangeTitle(e.target.value)}
							className={styles['title']}
							placeholder="标题"
						/>
					</InputGroup>
				</div>
				<div className={styles['belong']}>
					<span>标签&emsp;：</span>
					<Select
						mode="multiple"
						placeholder="请选择标签"
						defaultValue={formData.tags.map((item) => item.tag_id)}
						className={styles['select']}
						onChange={this.onSelectTag}
						maxTagCount={3}
					>
						{tags &&
							tags.list.map((item) => (
								<Option key={item.tag_id.toString()} value={item.tag_id}>
									{item.name}
								</Option>
							))}
					</Select>
				</div>
				<div className={styles['picture']}>
					标题图：
					<CustomImageUpload
						crop={true}
						onRemove={this.onReomvePic}
						url={formData.picture}
						onSuccess={this.onUpload}
					/>
				</div>
				<div className={styles['summary']}>
					<span>摘要&emsp;：</span>
					<TextArea
						maxLength={150}
						placeholder={'不超过150字'}
						autosize={{
							minRows: 4,
							maxRows: 6
						}}
						value={formData.summary}
						onChange={(e) => this.onChangeSummary(e.target.value)}
					/>

					<div />
				</div>
				<div className={styles['secret']}>
					<span>私密&emsp;：</span>
					<Switch
						checkedChildren="私密"
						unCheckedChildren="公开"
						checked={!!formData.secret}
						onChange={(checked) => this.onSetPrivate(checked ? 1 : 0)}
					/>
				</div>
				{!fetched && (
					<CustomEditor
						initValue={formData.content.content}
						uploadAddress={'/api/upload/user/image'}
						onChange={this.onChangeContent}
						height={'500px'}
					/>
				)}
			</div>
		) : (
			<CustomLoading />
		);
	}
}
