import { API } from '../services/API';
import { ReduxModel } from 'ryan-redux';
import { ThemeColors } from '@/config/constant';
import _ from 'lodash';

interface IThemeColors {
	name: string,
	defaultColors: string,
	currentColors: string;
}
interface ICssItem {
	source: string;
	fileName: string;
	matchColors: string[];
}
interface ThemeColorModel {
	colorObject: IThemeColors[];
	inited: boolean,
	cssData: ICssItem[]
}

export default class ThemeModel extends ReduxModel<ThemeColorModel> {
	constructor() {
		super();
		this.initThemeColor();
	}
	nameSpace = 'theme';

	state: ThemeColorModel = {
		colorObject: [
			{
				name: 'primary',
				defaultColors: ThemeColors.primary,
				currentColors: ThemeColors.primary,
			},
			{
				name: 'link',
				defaultColors: ThemeColors.link,
				currentColors: ThemeColors.link,
			}
		],
		inited: false,
		cssData: []
	}

	initThemeColor() {
		document.onreadystatechange=(()=>{
			if(document.readyState === "complete"){ 
				const styleData = window.CSS_EXTRACT_COLOR_PLUGIN || [];
				this.state.cssData = styleData;
				this.state.inited = true;
				this.setState({...this.state})
			}
		})
	}

	saveThemeColor(payload: [{ name: string; color: string }]) {

		let hasMatch = false;
		payload.forEach(item=>{
			this.state.colorObject.forEach(current=>{
				if(current.name === item.name) {
					current.currentColors = item.color;
					hasMatch = true;
				}
			});
		})
		if(!hasMatch) {
			throw new Error('没有匹配的主题色')
		}
		this.setState({ ...this.state });
		this.changeTheme();
		return this.state;
	}

	changeTheme() {
		const { cssData, colorObject} = this.state;
		const newStyle = 	cssData.map(item=>{
			const changeColors = colorObject.filter(colorItem=>item.matchColors.some(matchColor=>colorItem.defaultColors === matchColor) && (colorItem.currentColors !== colorItem.defaultColors));
			let source = '';
			changeColors.forEach(changeColor=>{
				source = replaceColor(item.source, changeColor.defaultColors, changeColor.currentColors)
			})
			return source;
		}).join('');

		const style = document.createElement('style');
		style.innerHTML = newStyle;
		document.body.appendChild(style);
	}
}


 function replaceColor(source: string, color: string, replaceColor:string) {
	return source.replace(new RegExp(`:\\s*${color}\\b`, 'mig'), `: ${replaceColor}`)
}
