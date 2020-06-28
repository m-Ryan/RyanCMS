import colorPalette from 'antd-color-palette';

interface colorItem { source: string; fileName: string; matchColors: string[]; };

export type ThemeColorState = {
	source: colorItem[],
	currentStyle: string;
};

export const themeColor = {
	state: {
		source: [],
		currentStyle: ''
	} as ThemeColorState,
	reducers: {
		setSource(state: ThemeColorState, source: colorItem[]) {
			return {
				...state,
				source
			};
		},
		setStyle(state: ThemeColorState, currentStyle: string) {
			return {
				...state,
				currentStyle
			};
		},
		replaceColor(state: ThemeColorState, payload: { sourceColor: string, nextColor: string; }) {
			const { sourceColor, nextColor } = payload;
			const styleText = state.source.map(item => {
				if (item.matchColors.includes(payload.sourceColor)) {
					return replaceAntdColors(item.source, sourceColor, nextColor);
				}
				return '';
			})
				.join('');
			return {
				...state,
				currentStyle: styleText
			};
		}
	},
};

function replaceAntdColors(styleText: string, sourceColor: string, nextColor: string) {
	for (let i = 0; i < 10; i++) {
		styleText = replaceColor(
			styleText,
			colorPalette(sourceColor, i),
			colorPalette(nextColor, i),
		);
	}
	styleText = replaceColor(
		styleText,
		sourceColor,
		nextColor
	);
	return styleText;
}

function replaceColor(source: string, color: string, replaceColor: string) {
	return source.replace(
		new RegExp(`(:.*?\\s*)(${color})(\\b.*?)(?=})`, 'mig'),
		group => {
			return group.replace(new RegExp(`${color}`, 'mig'), replaceColor);
		},
	);
}