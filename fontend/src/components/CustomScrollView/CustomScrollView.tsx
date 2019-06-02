import React from 'react';
import styles from './CustomScrollView.module.scss';
import { ReactAutoBind } from '../../util/decorators/reactAutoBind';
import { throttle } from '../../util/decorators/throttle';
import { CustomLoading } from '../CustomLoading/CustomLoading';
import { ClearUnmountState } from '../../util/decorators/clearUnmountState';
interface Props<T> {
	onScroll?: () => void;
	loadMore: () => void;
	className?: string;
	listClassName?: string;
	showLoading?: boolean;
	noMore?: boolean;
	data: T[];
	renderItem: (item: T, index: number) => React.ReactNode | typeof React.Component;
	show?: boolean;
	empty?: React.ReactNode;
	renderFooter?: React.ReactNode;
	renderHeader?: React.ReactNode;
}
interface State {
	loading: boolean;
}

@ClearUnmountState()
@ReactAutoBind()
export default class CustomScrollView extends React.Component<Props<any>, State> {
	scrollViewElement: React.RefObject<HTMLDivElement>;
	state: State = {
		loading: false
	};
	constructor(props: Props<any>) {
		super(props);
		this.scrollViewElement = React.createRef();
	}

	@throttle(200)
	async onended() {
		this.setState(
			{
				loading: true
			},
			async () => {
				await this.props.loadMore();
				this.setState({ loading: false });
			}
		);
	}

	async onScroll(e: any) {
		if (this.props.noMore) {
			return;
		}
		const distance = 100; //滚动条距离底部的距离
		const { scrollTop, clientHeight, scrollHeight } = e.nativeEvent.target as any;
		if (scrollTop + clientHeight > scrollHeight - distance) {
			this.onended();
		}
	}

	render() {
		const {
			className,
			showLoading,
			noMore,
			renderFooter,
			renderHeader,
			empty,
			data,
			renderItem,
			listClassName,
			show = true
		} = this.props;
		const { loading } = this.state;
		return show ? (
			<div
				className={`${styles['container']} ${className || ''}`}
				ref={this.scrollViewElement}
				onScroll={this.onScroll}
			>
				<React.Fragment>
					{/* header */}
					{renderHeader && renderHeader}
					{/* 列表 */}
					{empty && !loading && data.length === 0 && empty}
					<ul className={listClassName || ''}>{data.map((item, index) => renderItem(item, index))}</ul>

					{/* loading */}
					{showLoading && loading && <CustomLoading />}

					{/* footer */}
					{noMore ? renderFooter !== undefined ? (
						renderFooter
					) : (
						<div className={styles['footer']}>已经到达底部了</div>
					) : null}
				</React.Fragment>
			</div>
		) : null;
	}
}
