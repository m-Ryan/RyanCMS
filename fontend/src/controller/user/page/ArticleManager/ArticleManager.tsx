import { Select, Input, Table, Tag, Button, message, Popconfirm } from 'antd';
import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import styles from './ArticleManager.module.scss';
import { Link } from 'react-router-dom';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import { LayoutFilter } from '../../components/LayoutFilter/LayoutFilter';
import { Article } from '../../../../interface/article.interface';
import dayjs from 'dayjs';
import { API } from '../../../../services/API';
import { ListResponse } from '../../../../interface/response/list.response';
import { catchError } from '../../../../util/decorators/catchError';
import { PaginationConfig } from 'antd/lib/table';
import { Category } from '../../../../interface/category.interface';
import { SelectValue, OptionProps } from 'antd/lib/select';
import { debounce } from '../../../../util/decorators/debounce';
import { ClearUnmountState } from '../../../../util/decorators/clearUnmountState';
import { User } from '../../../../interface/user.interface';
import { loading } from '../../../../util/decorators/loading';

const Option = Select.Option;
const Search = Input.Search;
interface Props extends RouteProps, RouterProps {
	user: User;
}
interface State {
	page: number;
	size: number;
	categoryId?: number;
	data: ListResponse<Article>;
	categorys: Category[];
	loading: boolean;
}
@ClearUnmountState()
export default class ArticleManager extends React.Component<Props, any> {
	state: State = {
		page: 1,
		size: 10,
		categorys: [],
		data: {
			list: [],
			count: 0
		},
		loading: true
	};
	componentDidMount() {
		this.getCategorys();
		this.getList();
	}

	@loading()
	@catchError()
	async getList() {
		const { page, size, categoryId } = this.state;
		const result = await API.article.user.getList(page, size, categoryId);
		this.setState({
			data: result
		});
	}

	onSelectChange(value: SelectValue) {
		this.setState(
			{
				page: 1,
				categoryId: value
			},
			this.getList
		);
	}

	@debounce(300)
	onSearch(value: string) {
		this.setState(
			{
				page: 1
			},
			async () => {
				const { page, size } = this.state;
				const result = await API.article.user.search(value, page, size);
				this.setState({
					data: result
				});
			}
		);
	}

	onPageChange({ current }: PaginationConfig) {
		this.setState(
			{
				page: current
			},
			this.getList
		);
	}

	@catchError()
	async getCategorys() {
		const result = await API.category.user.getList(1, 10);
		this.setState({
			categorys: result.list
		});
	}

	@catchError()
	async delete(articleId: number) {
		await API.article.user.deleteArticle(articleId);
		await this.getList();
		message.success('删除成功');
	}
	@catchError()
	async onSetLevel(articleId: number, level: number) {
		await API.article.user.updateArticle({ article_id: articleId, level });
		message.success('更改成功');
	}

	render() {
		const { data, page, size, categorys, loading } = this.state;
		const { user } = this.props;
		const columns = [
			{
				title: '标题',
				dataIndex: 'title',
				render: (text: any) => (
					<a className={styles['title']} href="javascript:;">
						{text}
					</a>
				)
			},
			{
				title: '摘要',
				width: 300,
				dataIndex: 'summary',
				render: (summary: string) => <div className={styles['summary']}>{summary}</div>
			},
			{
				title: '栏目',
				width: 100,
				dataIndex: 'category',
				render: (category: Category) => <span>{category.name}</span>
			},
			{
				title: '标签',
				width: 200,
				dataIndex: 'tags',
				render: (tags: Article['tags']) => (
					<span>{tags.map((item, index) => <Tag key={index}>{item.name}</Tag>)}</span>
				)
			},
			{
				title: '权重',
				width: 100,
				render: (article: Article) => (
					<Select
						defaultValue={article.level}
						style={{ width: 80 }}
						onChange={(level) => this.onSetLevel(article.article_id, level)}
					>
						<Option value={1}>1</Option>
						<Option value={5}>5</Option>
						<Option value={10}>10</Option>
						<Option value={20}>20</Option>
						<Option value={50}>50</Option>
						<Option value={100}>100</Option>
					</Select>
				)
			},
			{
				title: '状态',
				width: 100,
				dataIndex: 'secret',
				render: (secret: number) => <span>{secret === 0 ? '公开' : '私密'}</span>
			},
			{
				title: '发布时间',
				width: 100,
				dataIndex: 'created_at',
				render: (created_at: number) => <span>{dayjs(created_at * 1000).format('YYYY-MM-DD')}</span>
			},
			{
				title: '操作',
				width: 150,
				fixed: false,
				render: (article: Article) => (
					<div>
						<Link to={`/admin/article-manager/editor?id=${article.article_id}`}>编辑</Link>
						&emsp;
						<Popconfirm
							title="你确定要删除这篇文章吗?"
							onConfirm={() => this.delete(article.article_id)}
							okText="确定"
							cancelText="取消"
						>
							<a>删除</a>
							&emsp;
						</Popconfirm>
						{article.secret === 0 && (
							<Link to={`/u/${user.nickname}/a/${article.title}`} target="_blank">
								查看
							</Link>
						)}
					</div>
				)
			}
		];
		return (
			<div className={styles['container']}>
				<LayoutTitle
					title={'文章管理'}
					aside={
						<Button type="primary">
							<Link to={'/admin/article-manager/editor'}>写文章</Link>
						</Button>
					}
				/>
				<LayoutFilter>
					<Select
						showSearch
						style={{ width: 200 }}
						placeholder="选择栏目"
						defaultValue=""
						filterOption={(inputValue: string, option: React.ReactElement<OptionProps>) =>
							(option.props.children as string).includes(inputValue)}
						onChange={(value: SelectValue) => this.onSelectChange(value)}
					>
						<Option value="">全部</Option>
						{categorys.map((item) => (
							<Option key={item.category_id.toString()} value={item.category_id}>
								{item.name}
							</Option>
						))}
					</Select>
					<Search
						placeholder="请输入文章名字"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onSearch(e.target.value)}
						className={styles['search']}
					/>
				</LayoutFilter>
				<Table
					loading={loading}
					bordered={true}
					columns={columns as any}
					rowKey="article_id"
					dataSource={data.list}
					pagination={{
						total: data.count,
						current: page,
						pageSize: size
					}}
					onChange={(page) => this.onPageChange(page)}
				/>
			</div>
		);
	}
}
