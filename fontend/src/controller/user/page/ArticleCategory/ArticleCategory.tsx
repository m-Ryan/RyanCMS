import { Button, message, Popconfirm, Modal, Popover, Icon } from 'antd';
import * as React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import * as styles from './ArticleCategory.module.scss';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import { API } from '@/services/API';
import { ListResponse } from '@/interface/response/list.response';
import { catchError } from '@/util/decorators/catchError';
import { ClearUnmountState } from '@/util/decorators/clearUnmountState';
import { User } from '@/interface/user.interface';
import { ReactAutoBind } from '@/util/decorators/reactAutoBind';
import { Category } from '@/interface/category.interface';
import CategoryForm from './components/CategoryForm/CategoryForm';
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder/EmptyPlaceholder';
import dayjs from 'dayjs';
import { loading } from '@/util/decorators/loading';
import { CustomLoading } from '@/components/CustomLoading/CustomLoading';
import { ListView } from '@/components/ListView';

interface Props extends RouteProps, RouterProps {
	user: User;
}
interface State {
	data: ListResponse<Category>;
	currentCategory: Category;
	visible: boolean;
	loading: boolean;
}

function createCategory(category?: Category) {
	if (category) return category;
	return {
		category_id: 0,
		name: '',
		picture: '',
		desc: '',
		created_at: 0,
		updated_at: 0,
		loading: false
	};
}

@ReactAutoBind()
@ClearUnmountState()
export default class ArticleCategory extends React.Component<Props, any> {
	state: State = {
		data: {
			list: [],
			count: 0
		},
		currentCategory: createCategory(),
		visible: false,
		loading: false
	};
	componentWillMount() {
		this.getCategorys();
	}

	@catchError()
	@loading()
	async getCategorys() {
		const categorys = await API.category.user.getList(1, 9999);
		this.setState({
			data: categorys
		});
	}

	addCategory() {
		this.setState({
			visible: true,
			currentCategory: createCategory()
		});
	}

	onCreated(category: Category) {
		const { data } = this.state;
		this.setState({
			visible: false,
			data: {
				list: [ ...data.list, category ],
				count: data.count + 1
			}
		});
	}

	@catchError()
	async onDelete(category: Category) {
		await API.category.user.deleteCategory(category.category_id);
		const { data } = this.state;
		data.list = data.list.filter((item) => item.category_id !== category.category_id);
		this.setState({
			visible: false,
			data: {
				list: data.list,
				count: data.count - 1
			}
		});
		message.success('删除成功');
	}

	onUpdateCategory(category: Category) {
		this.setState({
			visible: true,
			currentCategory: category
		});
	}

	@catchError()
	async onUpdated(category: Category) {
		await API.category.user.updateCategory(category);
		const { data } = this.state;
		data.list.forEach((item, index) => {
			if (item.category_id === category.category_id) {
				data.list[index] = category;
			}
		});
		this.setState({
			data: { ...data },
			visible: false
		});
	}

	render() {
		const { currentCategory, visible, data, loading } = this.state;
		return (
			<div className={styles['container']}>
				<LayoutTitle
					title={'栏目管理'}
					aside={
						<Button type="primary" onClick={this.addCategory}>
							添加栏目
						</Button>
					}
				/>
				<div className={styles['list']}>
					<ListView
						data={data.list}
						renderItem={(item, index) => (
							<Popover
								key={item.category_id}
								placement="top"
								overlayClassName={styles['popover']}
								title={
									<div className={styles['header']}>
										<span>栏目：{item.name}</span>
										<span className={styles['btn-wrap']}>
											<Icon type="edit" onClick={() => this.onUpdateCategory(item)} />
											&nbsp;
											<Popconfirm
												title="你确定要删除该栏目吗?"
												onConfirm={() => this.onDelete(item)}
												okText="确定"
												cancelText="取消"
											>
												<Icon type="delete" />
											</Popconfirm>
										</span>
									</div>
								}
								content={item.desc}
							>
								<div className={styles['list-item']}>
									<div className={styles['picture']}>
										<img src={item.picture} alt="" />
									</div>
									<div className={styles['content']}>
										<div className={styles['title']}>{item.name}</div>
										<div className={styles['count']}>
											创建于- {dayjs(item.created_at * 1000).format('YYYY-MM-DD')}
										</div>
									</div>
								</div>
							</Popover>
						)}
						empty={
							<EmptyPlaceholder size={72}>
								<div style={{ fontSize: '14px' }}>暂无栏目</div>
							</EmptyPlaceholder>
						}
						renderFooter={loading && data.count && <CustomLoading />}
					/>
				</div>
				<CategoryForm
					visible={visible}
					category={currentCategory}
					onCreated={this.onCreated}
					onUpdated={this.onUpdated}
				/>
			</div>
		);
	}
}
