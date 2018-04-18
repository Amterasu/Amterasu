# Amterasu
>博客：vue全家桶+node+mongodb

## 介绍
+ 实现了用户登录、检测登录、博客管理（文章的修改和删除）、文章编辑（Markdown）、标签分类等功能。
+ 前端使用vue全家桶（cli,router,vuex,axios），框架用的elmentUI
+ 后端使用node,框架用的express,mongoose
+ 数据库采用mongodb
+ **==登录后==可对文章进行操作，未登录下无操作权限**
+ 初次做博客肯定有不足的地方，恳切希望指出并指点。
## 线上预览
[点此链接](http://47.95.9.245:80/)

## 使用
+ 下载到本地
	+ `git clone https://github.com/Amterasu/Amterasu.git` 
+ 安装
	+ `npm install`
	+ 或者使用淘宝的`cnpm install`
+ 启动项目
	+ `cd amterasu`
	+ `npm run dev`
+ `http://localhost:8080`

+ ～使用个人服务器数据库，开发环境接口代理到远程服务器了，直接`npm run dev`即可访问
