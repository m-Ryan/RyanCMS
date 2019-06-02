import { Button, message, Popconfirm, Modal, Popover, Icon } from 'antd';
import * as React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import * as styles from './ArticleTag.module.scss';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import { API } from '../../../../services/API';
import { ListResponse } from '../../../../interface/response/list.response';
import { catchError } from '../../../../util/decorators/catchError';
import { ClearUnmountState } from '../../../../util/decorators/clearUnmountState';
import { User } from '../../../../interface/user.interface';
import { ReactAutoBind } from '../../../../util/decorators/reactAutoBind';
import { Tag } from '../../../../interface/tag.interface';
import TagForm from './components/TagForm/TagForm';
import { EmptyPlaceholder } from '../../../../components/EmptyPlaceholder/EmptyPlaceholder';
import { Condition } from '../../../../components/Condition';
import { CustomLoading } from '../../../../components/CustomLoading/CustomLoading';
import { loading } from '../../../../util/decorators/loading';

interface Props extends RouteProps, RouterProps {
	user: User;
}
interface State {
	data: ListResponse<Tag>;
	currentTag: Tag;
	visible: boolean;
	loading: boolean;
}

function createTag(tag?: Tag) {
	if (tag) return tag;
	return {
		tag_id: 0,
		name: '',
		picture: '',
		desc: '',
		created_at: 0,
		updated_at: 0
	};
}

@ReactAutoBind()
@ClearUnmountState()
export default class ArticleTag extends React.Component<Props, any> {
	state: State = {
		data: {
			list: [],
			count: 0
		},
		currentTag: createTag(),
		visible: false,
		loading: false
	};
	componentDidMount() {
		this.getTags();
	}

	@catchError()
	@loading()
	async getTags() {
		const tags = await API.tag.user.getList(1, 9999);
		this.setState({
			data: tags
		});
	}

	addTag() {
		this.setState({
			visible: true,
			currentTag: createTag()
		});
	}

	onCreated(tag: Tag) {
		const { data } = this.state;
		this.setState({
			visible: false,
			data: {
				list: [ ...data.list, tag ],
				count: data.count + 1
			}
		});
	}

	@catchError()
	async onDelete(tag: Tag) {
		await API.tag.user.deleteTag(tag.tag_id);
		const { data } = this.state;
		data.list = data.list.filter((item) => item.tag_id !== tag.tag_id);
		this.setState({
			visible: false,
			data: {
				list: data.list,
				count: data.count - 1
			}
		});
		message.success('删除成功');
	}

	onUpdateTag(tag: Tag) {
		this.setState({
			visible: true,
			currentTag: tag
		});
	}

	@catchError()
	async onUpdated(tag: Tag) {
		await API.tag.user.updateTag(tag);
		const { data } = this.state;
		data.list.forEach((item, index) => {
			if (item.tag_id === tag.tag_id) {
				data.list[index] = tag;
			}
		});
		this.setState({
			data: { ...data },
			visible: false
		});
	}

	render() {
		const { currentTag, visible, data, loading } = this.state;
		return (
			<div className={styles['container']}>
				<LayoutTitle
					title={'标签管理'}
					aside={
						<Button type="primary" onClick={this.addTag}>
							添加标签
						</Button>
					}
				/>
				<div className={styles['list']}>
					<Condition show={!loading}>
						{data.count ? (
							data.list.map((item) => (
								<Popover
									key={item.tag_id}
									placement="right"
									overlayClassName={styles['popover']}
									title={
										<div className={styles['header']}>
											<span>标签：{item.name}</span>
											<span className={styles['btn-wrap']}>
												<Icon type="edit" onClick={() => this.onUpdateTag(item)} />
												&nbsp;
												<Popconfirm
													title="你确定要删除该标签吗?"
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
									<Button className={styles['list-item']} type="primary" ghost>
										{item.name}
									</Button>
								</Popover>
							))
						) : (
							<EmptyPlaceholder size={72}>
								<div style={{ fontSize: '14px' }}>暂无标签</div>
							</EmptyPlaceholder>
						)}
					</Condition>
					<Condition show={loading}>
						<CustomLoading />
					</Condition>
				</div>
				<TagForm visible={visible} tag={currentTag} onCreated={this.onCreated} onUpdated={this.onUpdated} />
			</div>
		);
	}
}
