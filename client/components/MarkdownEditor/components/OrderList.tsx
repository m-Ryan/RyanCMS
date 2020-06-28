import React from 'react';
import { OrderedListOutlined } from '@ant-design/icons';
import { PluginItem } from './plugins';

export const OrderList: PluginItem = {
	tip: '列表',
	content: ({ editor, onChange }) => {
		const changeValue = () => {
			const { selectionStart, selectionEnd, value, scrollTop } = editor;
			const beginText = '\n- ';
			const selectdText = beginText + value.slice(selectionStart, selectionEnd);
			const newValue = value.slice(0, selectionStart) + selectdText + value.slice(selectionEnd);

			onChange({
				selectionStart: selectionStart + beginText.length,
				selectionEnd: selectionEnd + beginText.length,
				value: newValue,
			});
		};
		return <OrderedListOutlined onClick={changeValue} />;
	},
};
