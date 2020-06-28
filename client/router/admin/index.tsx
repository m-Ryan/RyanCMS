import UserCenter from '../../pages/admin/UserCenter';
import ArticleManager from '../../pages/admin/ArticleManager';
import ArticleTag from '../../pages/admin/ArticleTag';
import ArticleCategory from '../../pages/admin/ArticleCategory';
import IntroSetting from '../../pages/admin/IntroSetting/IntroSetting';
import UserSetting from '../../pages/admin/UserSetting';
import ArticleEditor from '../../pages/admin/ArticleEditor';
import Tools from '../../pages/admin/Tools';
import JsonToTs from '../../pages/admin/Tools/JsonToTs';
import PasteSource from '../../pages/admin/Tools/PasteSource';

export function getAdminRoutes() {
  return (
    [
      {
        path: '/admin',
        component: UserCenter,
        exact: true,
      },
      {
        path: '/admin/article-manager',
        component: ArticleManager,
        exact: true,
      },
      {
        path: '/admin/article-tag',
        component: ArticleTag,
        exact: true,
      },
      {
        path: '/admin/article-category',
        component: ArticleCategory,
        exact: true,
      },
      {
        path: '/admin/article-manager/editor',
        component: ArticleEditor,
        exact: true,
      },
      {
        path: '/admin/user-setting',
        component: UserSetting,
        exact: true,
      },
      {
        path: '/admin/intro-setting',
        component: IntroSetting,
        exact: true,
      },
      {
        path: '/admin/tools',
        component: Tools,
        exact: true,
      },
      {
        path: '/admin/tools',
        component: Tools,
        exact: true,
      },
      {
        path: '/admin/tools/json-to-interface',
        component: JsonToTs,
        exact: true,
      },
      {
        path: '/admin/tools/paste-source',
        component: PasteSource,
        exact: true,
      },
    ]
  );
}