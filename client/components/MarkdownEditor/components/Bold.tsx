import React from 'react';
import { BoldOutlined } from '@ant-design/icons';
import { PluginItem } from './plugins';

export const Bold: PluginItem = {
	tip: '加粗',
	content: ({ editor, onChange }) => {
		const changeValue = () => {
			const { selectionStart, selectionEnd, value, scrollTop } = editor;
			const boldText = '**' + value.slice(selectionStart, selectionEnd) + '**';
			const newValue = value.slice(0, selectionStart) + boldText + value.slice(selectionEnd);
			onChange({
				value: newValue,
				selectionStart: selectionStart + 2,
				selectionEnd: selectionEnd + 2,
			});
		};
		return <BoldOutlined onClick={changeValue} />;
	},
};
