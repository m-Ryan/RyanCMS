import { Home } from '../../pages/blog/Home';
import { Article } from '../../pages/blog/Article';
import { Record } from '../../pages/blog/Record';
import { Tag } from '../../pages/blog/Tag';
import { TagArticle } from '../../pages/blog/TagArticle';
import { About } from '../../pages/blog/About';

export function getBlogRoutes({ blogPrefix }: { blogPrefix: string; }) {
  return (
    [
      {
        path: `${blogPrefix}tag/:tag`,
        component: TagArticle,
        exact: true,
      },
      {
        path: `${blogPrefix}tag`,
        component: Tag,
        exact: true,
      },
      {
        path: `${blogPrefix}record`,
        component: Record,
        exact: true,
      },
      {
        path: `${blogPrefix}a/:title`,
        component: Article,
        exact: true,
      },
      {
        path: `${blogPrefix}about`,
        component: About,
        exact: true,
      },
      {
        path: `${blogPrefix}`,
        component: Home,
        exact: true,
      },
    ]
  );
}