///<reference path="../../typings/global.d.ts"/>
/**
 *
 * @param path 当前的路由
 * @param mathPath 匹配的路由
 */
export function comparePath(path: string, mathPath: string) {
	path = path.replace(/(\/)$/, '');
	mathPath = mathPath.replace(/(\/)$/, '');
	const paths = path.split('/');
	const mathPaths = mathPath.split('/');

	if (paths.length !== mathPaths.length) {
		// 当前路由的长度不能少于匹配的路由
		if (paths.length < mathPaths.length) {
			return false;
		}
		// 长度不等时，匹配的路由最后一项必须是 *
		if (mathPaths[mathPaths.length - 1] !== '*') {
			return false;
		}
	}

	for (let i = 0; i < mathPaths.length; i++) {
		if (paths[i] !== mathPaths[i] && mathPaths[i] !== ':id' && mathPaths[i] !== '*') {
			return false;
		}
	}

	return true;
}

export function awaitCssColorOnLoad() {
	return new Promise((resolve) => {
		if (window.CSS_EXTRACT_COLOR_PLUGIN) resolve();
		document.onreadystatechange = (status) => {
			if (window.CSS_EXTRACT_COLOR_PLUGIN) {
				resolve();
			}
		};
	});
}

export function isDevelopment() {
	return process.env.NODE_ENV === 'development';
}

export function isProduction() {
	return process.env.NODE_ENV === 'production';
}
