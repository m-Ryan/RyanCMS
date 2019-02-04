# RyanCMS 

## 特色
> * [x] 前后端分离
> * [x] typeScript
> * [x] 服务端渲染

## [项地址](http://cms.maocanhua.cn)

## [项目演示地址](http://cms.maocanhua.cn/u/Ryan)

### 如何使用

> git clone git@github.com:m-Ryan/RyanCMS.git

在 backend下新建一个文件夹config，在下面新建 ormconfig.json

![图片1](http://assets.maocanhua.cn/FtJVhfhzvMiGuIHuIKqIN3QtvfO3) 

里面的内容大概是这样
```
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "******",
  "database": "cms",
  "entities": [
    "src/**/**.entity{.ts,.js}"
  ],
  "synchronize": true,
  "cache": true,
  "logging": false
}
```
> 首次使用请先安装依赖
- 切换到 backend，npm install 或者 yarn
- 切换到 fontend，npm install 或者 yarn

1.切换到 backend
  - yarn start => 本地开发

2.切换到 fontend
  - yarn start => 本地开发

打开 http://localhost:3000/ 即可预览

---

## 服务端渲染

3.切换到 backend
  - yarn start => 本地开发

4.切换到 fontend
  - yarn build => 编译前端代码
  - yarn server:start => 本地开发，使用nodejs中间层

打开 http://localhost:3100/ 即可预览

--- 

## 部分页面 
![博客首页](http://assets.maocanhua.cn/FqmWmTvur0mTxa000AIAWxkycZTI)

![详情页](http://assets.maocanhua.cn/FlvtGEyl3Zf96yciMPfD-JfpHqsA) 

![留言区](http://assets.maocanhua.cn/Fmd9twKGnDdx_if1xp8CReEjc3ZJ) 

![归档](http://assets.maocanhua.cn/FnbQyUiK8BbtMocOhiJDQ4qnmdaj) 

![文章管理](http://assets.maocanhua.cn/FoxpVX3brem5H01CGsXJB4mkqVaM) 

![栏目管理](http://assets.maocanhua.cn/FrJgYl-vgD_419DDr4oUUHfzi75m) 

![文章编辑](http://assets.maocanhua.cn/FmfEGrUJNw_-tEJpX9bzx1pnElCZ) 

![文章编辑全屏](http://assets.maocanhua.cn/FvvPYQ692UwIk5qgkpb_mw1A6YGF) 

![个人信息设置](http://assets.maocanhua.cn/Fm8dIQh7Oquh3IzFkeOipPi_eveH) 
