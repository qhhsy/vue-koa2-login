# 使用 VueJS & NodeJS 实现基于 token 的登录注册

## 前言：
需要耐心，需要耐心，我在代码写了很多注释，你需要的是耐心阅读。能学到前后端很多东西。

## 技术栈：
* vue 2.X
* vuex
* vue-router
* element-ui
* axios
* koa2
* mongoose
* jsonwebtoken

## 功能：
用户输入网站进入localhost:8000/,由于没有登录直接跳转到/login页面，登录完成后自动跳转到主页并能进行其他操作。（没有登录没办法完成这些操作）

## 运行环境：
由于用的是koa2,所以请在官网下载最新版本,我用的是**7.8.0**版本。建议下载个nvm，它是window下管理node版本的工具，非常好用，只需几个命令就能随时切换node版本</br>
项目目录是用vue-cli搭建。然后自己在里面新建了server.js和server文件夹来写后端代码。不能少一步就是在config/index.js配置代理
```javascript
proxyTable: {
      '/api': {
				target: 'http://localhost:8888',
				changeOrigin: true
			}
    }
```

## 运行项目
前提条件：mongodb服务是挂起来的
```
//第一步
cd vue-koa2-login
//第二步
npm run dev
//第三步:挂起mongodb
mongod --dbpath XXXX(可以随便建个文件夹，这里是该文件夹的地址，将来用来存放数据)
//第三步
node server.js
```

## 关键代码一：
所有需要登录的路由在配置路由时都需加上：
```
meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
```

```
//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){
    if(token){
      next();
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  }else{
    next();//如果无需token,那么随它去吧
  }
});
```

## 关键代码二
拦截器可以做到统一处理所有利用axios发送的请求
```
//request拦截器
instance.interceptors.request.use(
    config => {
        if(store.state.token){
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
//respone拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        if(error.response){
            switch(error.response.status){
                case 401:
                    store.dispatch('UserLogout'); //可能是token失效，清楚它
                    router.replace({ //跳转到登录页面
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
            }
        }
        return Promise.reject(error.response.data);
    }
);
```
## 关于token的存储问题:
store,localStorage,sessionStorage三者皆可，看需求

## 分享阅读的资料及源码：
资料:</br>
[学习koa2](https://github.com/chenshenhai/koa2-note)</br>
[学习JSON Web Token](http://www.cocoachina.com/webapp/20151020/13824.html)</br>
[学习JSON Web Token](http://blog.leapoahead.com/2015/09/06/understanding-jwt/)</br>
[学习JSON Web Token](http://www.tuicool.com/articles/uuAzAbU)

源码：</br>
[一个项目学会前端实现登录拦截](https://github.com/superman66/vue-axios-github)</br>
[vue-login](https://github.com/ykloveyxk/vue-login)</br>
我是结合看这上面两个项目。

代码有什么问题，可以提issue或者加我QQ525136628联系我





