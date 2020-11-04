import { Select, Input, Table, Tag, Button, message, Popconfirm } from 'antd';
import React, { useEffect, useCallback } from 'react';
import styles from './index.module.scss';
import dayjs from 'dayjs';
import { Category } from '@/client/types/category.interface';
import { Article } from '@/client/types/article.interface';
import { WhiteSpace } from '@/client/components/WhiteSpace';
import { Link } from '@/client/components/Link';
import HeaderTitle from '@/client/components/HeaderTitle';
import { useCategoryList } from '@/client/selector/useCategoryList';
import { useArticleList } from '@/client/selector/useArticleList';
import { Pagination } from '@/client/components/Pagination';
import { useQuery } from '@/client/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { useArticle } from '@/client/selector/useArticle';
const Option = Select.Option;
const Search = Input.Search;

const SIZE = 10;
export default function ArticleManager() {
  const history = useHistory();
  const { p: page = 1, category: categoryId = '', title = '' } = useQuery();
  const {
    categoryListState,
    getAdminList: getCategoryList,
  } = useCategoryList();
  const { updateArticle, deleteArticle } = useArticle();
  const {
    reset,
    getAdminList,
    articleListState,
    getAdminListLoading,
  } = useArticleList();

  useEffect(() => {
    getCategoryList();
  }, [getCategoryList]);

  useEffect(() => {
    getAdminList({
      page,
      size: SIZE,
      category_id: categoryId,
      title,
    });
    return () => {
      reset();
    };
  }, [categoryId, getAdminList, page, reset, title]);

  const onSearch = useCallback(
    (title: string) => {
      history.push({
        search: qs.stringify({
          ...qs.parse(location.search, { ignoreQueryPrefix: true }),
          title,
        }),
      });
    },
    [history]
  );

  const onSelectCategory = useCallback(
    (id: string) => {
      history.push({
        search: qs.stringify({
          ...qs.parse(location.search, { ignoreQueryPrefix: true }),
          category: id,
        }),
      });
    },
    [history]
  );

  const onDeleteArticle = useCallback(
    async (id: number) => {
      await deleteArticle(id);
      getAdminList({
        page,
        size: SIZE,
        category_id: categoryId,
        title,
      });
    },
    [categoryId, deleteArticle, getAdminList, page, title]
  );

  const columns = [
    {
      title: '标题',
      render: (article: Article) => (
        <Link to={`/admin/article-manager/editor?id=${article.article_id}`}>
          {article.title}
        </Link>
      ),
    },
    {
      title: '摘要',
      width: 300,
      dataIndex: 'summary',
      render: (summary: string) => (
        <div className={styles['summary']}>{summary}</div>
      ),
    },
    {
      title: '栏目',
      width: 100,
      dataIndex: 'category',
      render: (category: Category) => <span>{category.name}</span>,
    },
    {
      title: '标签',
      width: 200,
      dataIndex: 'tags',
      render: (tags: Article['tags']) => (
        <span>
          {tags.map((item, index) => (
            <Tag key={index}>{item.name}</Tag>
          ))}
        </span>
      ),
    },
    {
      title: '权重',
      width: 100,
      render: (article: Article) => (
        <Select
          defaultValue={article.level}
          style={{ width: 80 }}
          onChange={(level) =>
            updateArticle({ article_id: article.article_id, level })
          }
        >
          <Option value={1}>1</Option>
          <Option value={5}>5</Option>
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={50}>50</Option>
          <Option value={100}>100</Option>
        </Select>
      ),
    },
    {
      title: '状态',
      width: 100,
      dataIndex: 'secret',
      render: (secret: number) => <span>{secret === 0 ? '公开' : '私密'}</span>,
    },
    {
      title: '发布时间',
      width: 100,
      dataIndex: 'created_at',
      render: (created_at: number) => (
        <span>{dayjs(created_at * 1000).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: '操作',
      width: 150,
      fixed: false,
      render: (article: Article) => (
        <div>
          <Link to={`/admin/article-manager/editor?id=${article.article_id}`}>
            编辑
          </Link>
          <WhiteSpace space={2} />
          <Popconfirm
            title='你确定要删除这篇文章吗?'
            onConfirm={() => onDeleteArticle(article.article_id)}
            okText='确定'
            cancelText='取消'
          >
            <a href='#'>
              删除
              <WhiteSpace />
            </a>
          </Popconfirm>
          {article.secret === 0 && (
            <Link type='user' to={`/a/${article.title}`} target='_blank'>
              查看
            </Link>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className={styles['container']}>
      <HeaderTitle
        title={'文章管理'}
        aside={
          <Button type='primary'>
            <Link to={'/admin/article-manager/editor'}>写文章</Link>
          </Button>
        }
      />
      <div className={styles['filter']}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder='选择栏目'
          defaultValue=''
          filterOption={(inputValue, option) =>
            option && option.props.children.includes(inputValue)
          }
          onChange={(value) => onSelectCategory(value)}
        >
          <Option value=''>全部</Option>
          {categoryListState.list.map((item) => (
            <Option key={item.category_id.toString()} value={item.category_id}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Search
          placeholder='请输入文章名字'
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearch(e.target.value)
          }
          className={styles['search']}
        />
      </div>
      <Table
        loading={getAdminListLoading}
        bordered={true}
        columns={columns as any}
        rowKey='article_id'
        dataSource={articleListState.list}
        pagination={false}
      />
      <Pagination total={articleListState.count} size={SIZE} />
    </div>
  );
}
