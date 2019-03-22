# RyanCMS 

基于这个项目，你可以了解到
 * [x] 前后端分离的实践
 * [x] react如何搭配typeScript
      - 例如编写基本的接口，枚举、泛型
      - 例如使用第三方包如何编写d.ts
 * [x] react服务端渲染
      - 如何通过nodejs中间层做服务端渲染
      - 如何在服务端渲染时向redux注入数据
      - 如何避免服务端已经调用的接口，在浏览器端重复调用
 * [x] 一种简单易用的redux模型
      - 这样的redux模型你用过没
     ![图片1](http://assets.maocanhua.cn/FscX6YmM2PzZniBm2A20EDE2Ox82)

     -  只要这样调用
     ![图片1](http://assets.maocanhua.cn/FpzfJcR_a-GY71hq3f-ombJ-FdXY)


 * [x] 装饰器的一些妙用
     - 例如编写一个autobind 绑定react中的this
     - 例如编写一个catchError 捕获错误
     - 例如编写一个loading 设置加载状态等等
     - ![图片1](http://assets.maocanhua.cn/FqYe1F8tn5aHooNgL_RMNFo2jq4t)

**[项目地址 http://cms.maocanhua.cn](http://cms.maocanhua.cn)** 

**[项目演示地址 http://cms.maocanhua.cn/u/Ryan](http://cms.maocanhua.cn/u/Ryan)**

**如何使用** 

```js
 git clone git@github.com:m-Ryan/RyanCMS.git
```

在 backend下新建一个文件夹config，在下面新建 ormconfig.json

![图片1](http://assets.maocanhua.cn/FtJVhfhzvMiGuIHuIKqIN3QtvfO3) 

里面的内容大概是这样
```json
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
