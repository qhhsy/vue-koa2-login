const Koa = require('koa');
const app = new Koa();
//router
const Router = require('koa-router');
//父路由
const router = new Router();
//bodyparser
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//引入子路由
const loginRouter = require('./server/routes/user.js');
//装载子路由
router.use('/api', loginRouter.routes(), loginRouter.allowedMethods());
//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(8888);
console.log('成功监听8888端口');