import BloggersModel from './bloggers';
import UserModel from './user';
import QiNiuConfigModel from './qiNiuConfig';
import ArticleListModel from './articleList';
import ArticlesModel from './articles';
import ResumesModel from './resumes';
import ThemeModel from './theme';
import RouterModel from './router';

const bloggersModel = new BloggersModel();
const userModel = new UserModel();
const qiNiuConfigModel = new QiNiuConfigModel();
const articleListModel = new ArticleListModel();
const articleModel = new ArticlesModel();
const resumeModel = new ResumesModel();
const themeModel = new ThemeModel();
const routerModel = new RouterModel();

export {
	bloggersModel,
	userModel,
	qiNiuConfigModel,
	articleListModel,
	articleModel,
	resumeModel,
	themeModel,
	routerModel
};
