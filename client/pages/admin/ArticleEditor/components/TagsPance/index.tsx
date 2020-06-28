import * as React from 'react';
import { Tag } from 'antd';
import { Tag as Itag } from '../../../../../../interface/tag.interface';
import * as styles from './TagsPance.module.scss';
interface Props {
	dataSource: Itag[];
	onClick: (tagId: number) => void;
}
export default class TagsPance extends React.Component<Props> {
	render() {
		const { dataSource, onClick } = this.props;
		return (
			<div className={styles['container']}>
				{dataSource.map((item) => (
					<Tag onClick={() => onClick(item.tag_id)} key={item.tag_id} className={styles['pance-item']}>
						{item.name}
					</Tag>
				))}
			</div>
		);
	}
}
