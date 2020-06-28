import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { PluginItem } from './plugins';

export const Quote: PluginItem = {
	tip: '引用',
	content: ({ editor, onChange }) => {
		const changeValue = () => {
			const { selectionStart, selectionEnd, value, scrollTop } = editor;
			const beginText = '\n > ';
			const quoteText = beginText + value.slice(selectionStart, selectionEnd) + '\n';
			const newValue = value.slice(0, selectionStart) + quoteText + value.slice(selectionEnd);

			onChange({
				selectionStart: selectionStart + beginText.length,
				selectionEnd: selectionEnd + beginText.length,
				value: newValue,
			});
		};
		return <RightOutlined onClick={changeValue} />;
	},
};
