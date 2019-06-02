import React from 'react';
import { ClearUnmountState } from '@/util/decorators/clearUnmountState';
import { API } from '@/services/API';
import { catchError } from '@/util/decorators/catchError';
import { History, Location } from 'history';
import styles from './Tag.module.scss';
import { User } from '@/interface/user.interface';
import { Tag as ITag } from '@/interface/tag.interface';
import { Link } from 'react-router-dom';
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder/EmptyPlaceholder';
import { CustomLoading } from '@/components/CustomLoading/CustomLoading';
import { loading } from '@/util/decorators/loading';
import { UserContainer } from '../../components/UserContainer/UserContainer';
import { ListView } from '@/components/ListView';
import { routerModel } from '@/model';
interface Props {
	history: History;
	location: Location;
	blogger: User;
	user?: User;
}

interface State {
	page: number;
	size: number;
	data: ITag[];
	count: number;
	loading: boolean;
}
const colorBox = [
	'8da2dd',
	'4a2ac0',
	'3d82de',
	'f9b3c7',
	'ff5cb7',
	'd539c5',
	'dd3b3b',
	'4fd9b6',
	'd86500',
	'94f686',
	'fc296d',
	'e77e2e',
	'6e90ff',
	'f9b1d3',
	'e26f70',
	'f479a7',
	'dcb927',
	'f0d193',
	'a8fde2',
	'33c379',
	'0f39f8',
	'ffc8fd',
	'6bd344',
	'0d3f9b',
	'af312c',
	'0088b7',
	'67b1d2',
	'005985',
	'94f686',
	'99df72'
];
@ClearUnmountState()
export default class Tag extends React.PureComponent<Props, State> {
	state: State = {
		page: 1,
		size: 9999,
		data: [],
		count: 0,
		loading: false
	};

	async componentDidMount() {
		this.getTagList();
	}

	@catchError()
	@loading()
	async getTagList() {
		const { page, size } = this.state;
		const { blogger } = this.props;
		const result = await API.tag.visitor.getList(page, size, blogger.user_id); // 拿到全部标签，不分页
		this.setState({
			data: result.list,
			count: result.count
		});
	}

	render() {
		const { data, count, loading } = this.state;
		const { blogger } = this.props;
		const prefixPath = routerModel.getPrefixPath();
		return (
			<UserContainer {...this.props}>
				<div className={styles['container']}>
					{!loading ? (
						<div className={styles['tags']}>
							<ListView
								data={data}
								renderItem={(item, index) => (
									<Link
										key={item.tag_id}
										to={prefixPath.replace(':id', blogger.nickname) + `/t/${item.name}`}
									>
										<div
											className={styles['tag-item']}
											style={{ background: '#' + colorBox[index % colorBox.length] }}
										>
											{item.name}（{item!.articlesCount}）
										</div>
									</Link>
								)}
								empty={
									<EmptyPlaceholder size={72}>
										<div style={{ fontSize: '14px' }}>暂无标签</div>
									</EmptyPlaceholder>
								}
							/>
						</div>
					) : (
						<CustomLoading />
					)}
				</div>
			</UserContainer>
		);
	}
}
