import React from 'react';
import { ItalicOutlined } from '@ant-design/icons';
import { PluginItem } from './plugins';

export const Italic: PluginItem = {
	tip: '斜体',
	content: ({ editor, onChange }) => {
		const changeValue = () => {
			const { selectionStart, selectionEnd, value, scrollTop } = editor;
			const newText = '*' + value.slice(selectionStart, selectionEnd) + '*';
			const newValue = value.slice(0, selectionStart) + newText + value.slice(selectionEnd);
			onChange({
				selectionStart: selectionStart + 1,
				selectionEnd: selectionEnd + 1,
				value: newValue,
			});
		};
		return <ItalicOutlined onClick={changeValue} />;
	},
};
